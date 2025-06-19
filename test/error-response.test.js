const { createErrorResponse, createErrorLog, ERROR_TYPES } = require('../src/utils/error-response');

describe('Error Response Utility', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  test('createErrorResponse should return correct error for NOT_FOUND', () => {
    createErrorResponse(mockResponse, 'NOT_FOUND');
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: {
        type: 'NOT_FOUND',
        message: 'Resource not found'
      }
    });
  });

  test('createErrorLog should create a structured error log', () => {
    const errorLog = createErrorLog('FORBIDDEN', 'Access denied', { userId: 123 });
    
    expect(errorLog).toHaveProperty('timestamp');
    expect(errorLog.type).toBe('FORBIDDEN');
    expect(errorLog.message).toBe('Access denied');
    expect(errorLog.context).toEqual({ userId: 123 });
  });
});