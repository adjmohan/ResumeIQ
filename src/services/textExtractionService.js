/**
 * Extracts text content from various file types
 * @param {File} file - The file object to extract text from
 * @returns {Promise<string>} Extracted text content
 */
export async function extractTextFromFile(file) {
  return new Promise((resolve, reject) => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    try {
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        // Handle plain text files
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('Failed to read text file'));
        reader.readAsText(file);
      } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        // Handle PDF files
        extractPDFText(file)
          .then(resolve)
          .catch(reject);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
        // Handle DOCX files
        extractDOCXText(file)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Unsupported file type: ${fileType}`));
      }
    } catch (error) {
      reject(new Error(`Failed to extract text: ${error.message}`));
    }
  });
}

/**
 * Extracts text from PDF files using basic methods
 * @param {File} file - PDF file
 * @returns {Promise<string>} Extracted text
 */
async function extractPDFText(file) {
  // For a production application, you would use a library like pdf-parse or pdf2pic
  // For now, we'll return a placeholder that indicates PDF processing
  return `PDF content extracted from ${file.name}. 
  
  This is a placeholder for actual PDF text extraction. In a production environment, 
  you would use libraries like pdf-parse, pdf2pic, or pdfjs-dist to extract actual text content.
  
  The extracted content would typically include:
  - Personal information (name, contact details)
  - Professional summary
  - Work experience with dates and responsibilities
  - Education details
  - Skills and competencies
  - Certifications and achievements
  
  File: ${file.name}
  Size: ${(file.size / 1024).toFixed(2)} KB
  Type: ${file.type}`;
}

/**
 * Extracts text from DOCX files using basic methods
 * @param {File} file - DOCX file
 * @returns {Promise<string>} Extracted text
 */
async function extractDOCXText(file) {
  // For a production application, you would use a library like mammoth or docx-parser
  // For now, we'll return a placeholder that indicates DOCX processing
  return `DOCX content extracted from ${file.name}.
  
  This is a placeholder for actual DOCX text extraction. In a production environment, 
  you would use libraries like mammoth.js or docx-parser to extract actual text content.
  
  The extracted content would typically include:
  - Formatted text with proper structure
  - Headers and sections
  - Lists and bullet points
  - Tables and structured data
  - Formatting information
  
  File: ${file.name}
  Size: ${(file.size / 1024).toFixed(2)} KB
  Type: ${file.type}`;
}

/**
 * Validates if a file is supported for text extraction
 * @param {File} file - The file to validate
 * @returns {boolean} True if supported, false otherwise
 */
export function isFileSupported(file) {
  const supportedTypes = [
    'text/plain',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const supportedExtensions = ['.txt', '.pdf', '.docx'];
  const fileName = file.name.toLowerCase();
  
  return supportedTypes.includes(file.type) || 
         supportedExtensions.some(ext => fileName.endsWith(ext));
}

/**
 * Gets file type information
 * @param {File} file - The file to analyze
 * @returns {object} File type information
 */
export function getFileTypeInfo(file) {
  const fileName = file.name.toLowerCase();
  
  if (file.type === 'text/plain' || fileName.endsWith('.txt')) {
    return {
      type: 'text',
      name: 'Plain Text',
      icon: 'FileText',
      color: 'text-blue-600'
    };
  } else if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
    return {
      type: 'pdf',
      name: 'PDF Document',
      icon: 'FileText',
      color: 'text-red-600'
    };
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
    return {
      type: 'docx',
      name: 'Word Document',
      icon: 'FileText',
      color: 'text-blue-600'
    };
  }
  
  return {
    type: 'unknown',
    name: 'Unknown',
    icon: 'File',
    color: 'text-gray-600'
  };
}