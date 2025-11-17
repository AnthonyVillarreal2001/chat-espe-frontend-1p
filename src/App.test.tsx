import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

describe('App', () => {
  it('renders home page by default', () => {
    render(<AppWithRouter />)
    expect(screen.getByText('Chat Seguro ESPE')).toBeInTheDocument()
    expect(screen.getByText('Sistema de Salas Seguras en Tiempo Real')).toBeInTheDocument()
  })

  it('shows admin and user sections', () => {
    render(<AppWithRouter />)
    expect(screen.getByText('Panel Administrador')).toBeInTheDocument()
    expect(screen.getByText('Unirse a Sala')).toBeInTheDocument()
  })
})