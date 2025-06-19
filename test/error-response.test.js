const { createErrorResponse, createErrorLog, ERROR_TYPES } = require('../src/utils/error-response');

describe('Error Response Utility', () => {
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  beforeEach(() => {
    mockResponse.status.mockClear();
    mockResponse.json.mockClear();
  });

  test('createErrorResponse handles known error types', () => {
    createErrorResponse(mockResponse, 'NOT_FOUND');
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        type: 'NOT_FOUND',
        message: 'Resource not found'
      }
    });
  });

  test('createErrorResponse allows custom messages', () => {
    createErrorResponse(mockResponse, 'FORBIDDEN', 'Custom forbidden message');
    
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        type: 'FORBIDDEN',
        message: 'Custom forbidden message'
      }
    });
  });

  test('createErrorLog creates structured log object', () => {
    const logEntry = createErrorLog('TEST', 'Test error message', { context: 'test' });
    
    expect(logEntry).toHaveProperty('timestamp');
    expect(logEntry.type).toBe('TEST');
    expect(logEntry.message).toBe('Test error message');
    expect(logEntry.context).toEqual({ context: 'test' });
  });
});