import * as fs from 'fs/promises';
import { checkFileAccess, FileAccessError } from '../src/fileErrorHandler';

jest.mock('fs/promises');

describe('File Access Check', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('checkFileAccess should not throw when file is accessible', async () => {
    // Mock successful file access
    (fs.access as jest.MockedFunction<typeof fs.access>).mockResolvedValue(undefined);
    (fs.stat as jest.MockedFunction<typeof fs.stat>).mockResolvedValue({} as any);

    await expect(checkFileAccess('/path/to/valid/file')).resolves.not.toThrow();
  });

  test('checkFileAccess should throw FileAccessError when file is inaccessible', async () => {
    // Mock file access failure
    (fs.access as jest.MockedFunction<typeof fs.access>).mockRejectedValue(new Error('Permission denied'));

    await expect(checkFileAccess('/path/to/invalid/file')).rejects.toThrow(FileAccessError);
  });
});