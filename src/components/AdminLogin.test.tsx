import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminLogin from '../components/AdminLogin'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('AdminLogin', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form with correct elements', () => {
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    expect(screen.getByText('Panel Administrador')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Usuario')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('shows admin credentials', () => {
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    expect(screen.getByText(/Usuario:/)).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText(/Contraseña:/)).toBeInTheDocument()
    expect(screen.getByText('espe2025')).toBeInTheDocument()
  })

  it('updates form fields when typing', async () => {
    const user = userEvent.setup()
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    const usernameInput = screen.getByPlaceholderText('Usuario')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    
    await user.type(usernameInput, 'admin')
    await user.type(passwordInput, 'password')
    
    expect(usernameInput).toHaveValue('admin')
    expect(passwordInput).toHaveValue('password')
  })

  it('calls onLogin when login is successful', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true }
    })
    
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    await user.type(screen.getByPlaceholderText('Usuario'), 'admin')
    await user.type(screen.getByPlaceholderText('Contraseña'), 'espe2025')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled()
    })
  })

  it('shows error message when login fails', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'Credenciales inválidas' } }
    })
    
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    await user.type(screen.getByPlaceholderText('Usuario'), 'wrong')
    await user.type(screen.getByPlaceholderText('Contraseña'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    
    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    })
  })

  it('shows loading state during login', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<AdminLogin onLogin={mockOnLogin} />)
    
    await user.type(screen.getByPlaceholderText('Usuario'), 'admin')
    await user.type(screen.getByPlaceholderText('Contraseña'), 'espe2025')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    
    expect(screen.getByText('Ingresando...')).toBeInTheDocument()
  })
})