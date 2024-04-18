type MimeTypeMap = {
  [key: string]: string;
  'image/jpeg': string;
  'image/png': string;
  'application/pdf': string;
};


export const mimeToExtension: MimeTypeMap = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
};