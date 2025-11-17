declare global {
  const mockSocket: {
    emit: ReturnType<typeof vi.fn>
    on: ReturnType<typeof vi.fn>
    off: ReturnType<typeof vi.fn>
    connect: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
    connected: boolean
  }
}