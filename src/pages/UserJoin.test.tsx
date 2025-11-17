import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import UserJoin from '../pages/UserJoin'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const UserJoinWithRouter = () => (
  <BrowserRouter>
    <UserJoin />
  </BrowserRouter>
)

describe('UserJoin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders join form with correct elements', () => {
    render(<UserJoinWithRouter />)
    
    expect(screen.getByText('Unirse a Sala')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ID de la sala (8 caracteres)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('PIN (4+ dígitos)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tu nickname')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Unirse al Chat' })).toBeInTheDocument()
  })

  it('updates form fields when typing', async () => {
    const user = userEvent.setup()
    render(<UserJoinWithRouter />)
    
    const roomIdInput = screen.getByPlaceholderText('ID de la sala (8 caracteres)')
    const pinInput = screen.getByPlaceholderText('PIN (4+ dígitos)')
    const nicknameInput = screen.getByPlaceholderText('Tu nickname')
    
    await user.type(roomIdInput, 'ABC12345')
    await user.type(pinInput, '1234')
    await user.type(nicknameInput, 'TestUser')
    
    expect(roomIdInput).toHaveValue('ABC12345')
    expect(pinInput).toHaveValue('1234')
    expect(nicknameInput).toHaveValue('TestUser')
  })

  it('navigates to chat room when form is submitted with valid data', async () => {
    const user = userEvent.setup()
    render(<UserJoinWithRouter />)
    
    await user.type(screen.getByPlaceholderText('ID de la sala (8 caracteres)'), 'ABC12345')
    await user.type(screen.getByPlaceholderText('PIN (4+ dígitos)'), '1234')
    await user.type(screen.getByPlaceholderText('Tu nickname'), 'TestUser')
    
    await user.click(screen.getByRole('button', { name: 'Unirse al Chat' }))
    
    expect(mockNavigate).toHaveBeenCalledWith('/chat/ABC12345/1234/TestUser')
  })

  it('does not navigate when PIN is less than 4 characters', async () => {
    const user = userEvent.setup()
    render(<UserJoinWithRouter />)
    
    await user.type(screen.getByPlaceholderText('ID de la sala (8 caracteres)'), 'ABC12345')
    await user.type(screen.getByPlaceholderText('PIN (4+ dígitos)'), '123')
    await user.type(screen.getByPlaceholderText('Tu nickname'), 'TestUser')
    
    await user.click(screen.getByRole('button', { name: 'Unirse al Chat' }))
    
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('does not navigate when required fields are empty', async () => {
    const user = userEvent.setup()
    render(<UserJoinWithRouter />)
    
    await user.click(screen.getByRole('button', { name: 'Unirse al Chat' }))
    
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})