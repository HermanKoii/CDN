import fs from 'fs/promises';
import { checkFileAccess, FileAccessError } from '../src/fileErrorHandler';

jest.mock('fs/promises');

describe('File Access Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('checkFileAccess succeeds for valid file', async () => {
    // Create mock for successful file access
    (fs.access as jest.MockedFunction<typeof fs.access>).mockResolvedValue(undefined);
    (fs.stat as jest.MockedFunction<typeof fs.stat>).mockResolvedValue({} as any);

    await expect(checkFileAccess('/path/to/valid/file')).resolves.not.toThrow();
  });

  test('checkFileAccess throws FileAccessError for inaccessible file', async () => {
    // Simulate file access error
    (fs.access as jest.MockedFunction<typeof fs.access>).mockRejectedValue(new Error('Permission denied'));

    await expect(checkFileAccess('/path/to/invalid/file')).rejects.toThrow(FileAccessError);
  });
});