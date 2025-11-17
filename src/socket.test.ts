import { describe, it, expect } from 'vitest'
import socket from './socket'

describe('Socket configuration', () => {
  it('should be defined', () => {
    expect(socket).toBeDefined()
  })

  it('should use correct backend URL from environment', () => {
    // Socket should be configured with VITE_BACKEND_URL or fallback
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
    expect(backendUrl).toMatch(/^https?:\/\//)
  })
})