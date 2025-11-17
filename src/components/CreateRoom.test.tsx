import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateRoom from '../components/CreateRoom'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('CreateRoom', () => {
  const mockOnRoomCreated = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders create room form', () => {
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    expect(screen.getByText('Crear Nueva Sala')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nombre de la sala')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Solo Texto')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear Sala' })).toBeInTheDocument()
  })

  it('updates form fields', async () => {
    const user = userEvent.setup()
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    const nameInput = screen.getByPlaceholderText('Nombre de la sala')
    const pinInput = screen.getByPlaceholderText('PIN (mínimo 4 dígitos)')
    const typeSelect = screen.getByDisplayValue('Solo Texto')
    
    await user.type(nameInput, 'Test Room')
    await user.type(pinInput, '1234')
    await user.selectOptions(typeSelect, 'multimedia')
    
    expect(nameInput).toHaveValue('Test Room')
    expect(pinInput).toHaveValue('1234')
    expect(typeSelect).toHaveValue('multimedia')
  })

  it('creates room successfully', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockResolvedValueOnce({
      data: { room_id: 'ABC12345' }
    })
    
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Test Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '1234')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    await waitFor(() => {
      expect(mockOnRoomCreated).toHaveBeenCalledWith('ABC12345')
    })
  })

  it('handles creation error', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'))
    
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Test Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '1234')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error al crear sala')
    })
    
    alertSpy.mockRestore()
  })

  it('shows loading state', async () => {
    const user = userEvent.setup()
    mockedAxios.post.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Test Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '1234')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    expect(screen.getByText('Creando...')).toBeInTheDocument()
  })

  it('handles production environment', async () => {
    const user = userEvent.setup()
    // Mock production environment
    vi.stubEnv('MODE', 'production')
    
    mockedAxios.post.mockResolvedValueOnce({
      data: { room_id: 'PROD123' }
    })
    
    render(<CreateRoom onRoomCreated={mockOnRoomCreated} />)
    
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Prod Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '5678')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://chat-espe-backend-production.up.railway.app/api/admin/rooms',
        expect.any(Object),
        expect.any(Object)
      )
    })
    
    vi.unstubAllEnvs()
  })
})