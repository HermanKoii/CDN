import * as fs from 'fs/promises';

/**
 * Custom error class for file access and permission errors
 */
export class FileAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileAccessError';
  }
}

/**
 * Safely check file access and permissions
 * @param filePath Path to the file to check
 * @throws {FileAccessError} If file cannot be accessed
 */
export const checkFileAccess = async (filePath: string) => {
  try {
    // Attempt to access file metadata
    await fs.access(filePath);
    await fs.stat(filePath);
  } catch (error) {
    // Translate system errors to custom FileAccessError
    if (error instanceof Error) {
      throw new FileAccessError(`Cannot access file: ${error.message}`);
    }
    throw new FileAccessError('Unknown file access error');
  }
};