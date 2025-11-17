import '@testing-library/jest-dom'

// Mock Socket.IO client
const mockSocket = {
  emit: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  connected: false,
}

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => mockSocket),
}))

// Make mockSocket available globally for tests
global.mockSocket = mockSocket

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})