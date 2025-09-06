// File: src/utils/stringUtils.js
export function sanitizeFilename(filename) {
    return filename.replace(/["' ]+/g, '_');
}