import path from 'path';
import fs from 'fs';

/**
 * Configuration for CDN file serving
 */
const cdnConfig = {
  /**
   * Base directory for serving files
   * Ensures files can only be served from this directory
   */
  BASE_CDN_DIR: (() => {
    const defaultPath = path.resolve(process.cwd(), 'cdn_files');
    
    // Ensure the directory exists, create if not
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath, { recursive: true });
    }
    
    return defaultPath;
  })(),

  /**
   * Validate if the requested file path is within the allowed CDN directory
   * @param {string} filePath - Path to the file being requested
   * @returns {boolean} Whether the file path is allowed
   */
  isValidCdnPath: function(filePath) {
    try {
      // Normalize paths to resolve any '..' or '.' 
      const normalizedRequestPath = path.normalize(path.resolve(filePath));
      const normalizedBasePath = path.normalize(this.BASE_CDN_DIR);

      // Check if the file path is within the base CDN directory
      const isWithinBaseDir = normalizedRequestPath.startsWith(normalizedBasePath);

      // Additional security: Ensure the path is a file and exists
      return isWithinBaseDir && 
             fs.existsSync(normalizedRequestPath) && 
             fs.lstatSync(normalizedRequestPath).isFile();
    } catch (error) {
      console.error('CDN path validation error:', error);
      return false;
    }
  },

  /**
   * Allow dynamic configuration of CDN directory
   * @param {string} customPath - Custom path for CDN files
   */
  configureCdnPath: function(customPath) {
    if (path.isAbsolute(customPath)) {
      this.BASE_CDN_DIR = customPath;
    } else {
      this.BASE_CDN_DIR = path.resolve(process.cwd(), customPath);
    }
    
    // Ensure the directory exists
    if (!fs.existsSync(this.BASE_CDN_DIR)) {
      fs.mkdirSync(this.BASE_CDN_DIR, { recursive: true });
    }
  }
};

export default cdnConfig;