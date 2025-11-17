import { describe, it, expect } from 'vitest'
import type { Message, RoomForm } from './index'

describe('Type definitions', () => {
  it('should have Message interface with all text message properties', () => {
    const textMessage: Message = {
      username: 'TestUser',
      timestamp: '2025-11-17T10:00:00Z',
      type: 'text',
      msg: 'Hello world'
    }

    expect(textMessage.username).toBe('TestUser')
    expect(textMessage.timestamp).toBe('2025-11-17T10:00:00Z')
    expect(textMessage.type).toBe('text')
    expect(textMessage.msg).toBe('Hello world')
    expect(textMessage.filename).toBeUndefined()
    expect(textMessage.filetype).toBeUndefined()
    expect(textMessage.file).toBeUndefined()
  })

  it('should have Message interface with all file message properties', () => {
    const fileMessage: Message = {
      username: 'FileUser',
      timestamp: '2025-11-17T11:00:00Z',
      type: 'file',
      filename: 'document.pdf',
      filetype: 'application/pdf',
      file: 'base64encodeddata'
    }

    expect(fileMessage.username).toBe('FileUser')
    expect(fileMessage.timestamp).toBe('2025-11-17T11:00:00Z')
    expect(fileMessage.type).toBe('file')
    expect(fileMessage.filename).toBe('document.pdf')
    expect(fileMessage.filetype).toBe('application/pdf')
    expect(fileMessage.file).toBe('base64encodeddata')
    expect(fileMessage.msg).toBeUndefined()
  })

  it('should support Message with minimal required properties', () => {
    const minimalMessage: Message = {
      username: 'MinUser',
      timestamp: '2025-11-17T12:00:00Z',
      type: 'text'
    }

    expect(minimalMessage.username).toBe('MinUser')
    expect(minimalMessage.timestamp).toBe('2025-11-17T12:00:00Z')
    expect(minimalMessage.type).toBe('text')
  })

  it('should have RoomForm interface with text room type', () => {
    const textRoom: RoomForm = {
      name: 'Discussion Room',
      pin: '9876',
      type: 'text'
    }

    expect(textRoom.name).toBe('Discussion Room')
    expect(textRoom.pin).toBe('9876')
    expect(textRoom.type).toBe('text')
  })

  it('should have RoomForm interface with multimedia room type', () => {
    const multimediaRoom: RoomForm = {
      name: 'Media Sharing Room',
      pin: '5432',
      type: 'multimedia'
    }

    expect(multimediaRoom.name).toBe('Media Sharing Room')
    expect(multimediaRoom.pin).toBe('5432')
    expect(multimediaRoom.type).toBe('multimedia')
  })

  it('should validate type literal values', () => {
    // Test that type literal values are correctly typed
    const messageTypes: Array<Message['type']> = ['text', 'file']
    const roomTypes: Array<RoomForm['type']> = ['text', 'multimedia']
    
    expect(messageTypes).toContain('text')
    expect(messageTypes).toContain('file')
    expect(roomTypes).toContain('text')
    expect(roomTypes).toContain('multimedia')
  })
})