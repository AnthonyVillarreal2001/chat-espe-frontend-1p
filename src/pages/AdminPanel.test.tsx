import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AdminPanel from '../pages/AdminPanel'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock axios for CreateRoom component
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { room_id: 'TEST123' } }))
  }
}))

const AdminPanelWithRouter = () => (
  <BrowserRouter>
    <AdminPanel />
  </BrowserRouter>
)

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders admin panel interface', () => {
    render(<AdminPanelWithRouter />)
    
    expect(screen.getByText('Panel de Administración')).toBeInTheDocument()
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()
    expect(screen.getByText('Crear Nueva Sala')).toBeInTheDocument()
  })

  it('navigates home when logout is clicked', async () => {
    const user = userEvent.setup()
    render(<AdminPanelWithRouter />)
    
    await user.click(screen.getByText('Cerrar Sesión'))
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('shows created room ID when room is created', async () => {
    const user = userEvent.setup()
    render(<AdminPanelWithRouter />)
    
    // Fill the create room form
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Test Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '1234')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    // Wait for room ID to appear
    await screen.findByText('Última sala creada:')
    expect(screen.getByText('TEST123')).toBeInTheDocument()
  })

  it('has correct styling for logout button', () => {
    render(<AdminPanelWithRouter />)
    
    const logoutButton = screen.getByText('Cerrar Sesión')
    expect(logoutButton).toHaveStyle({
      background: 'rgb(220, 53, 69)',
      color: 'rgb(255, 255, 255)'
    })
  })

  it('shows room creation success message with correct styling', async () => {
    const user = userEvent.setup()
    render(<AdminPanelWithRouter />)
    
    // Create a room
    await user.type(screen.getByPlaceholderText('Nombre de la sala'), 'Test Room')
    await user.type(screen.getByPlaceholderText('PIN (mínimo 4 dígitos)'), '1234')
    await user.click(screen.getByRole('button', { name: 'Crear Sala' }))
    
    // Check success message styling
    const successDiv = await screen.findByText('Última sala creada:')
    const parentDiv = successDiv.closest('div')
    expect(parentDiv).toHaveStyle({
      background: '#d4edda',
      color: '#155724'
    })
  })
})