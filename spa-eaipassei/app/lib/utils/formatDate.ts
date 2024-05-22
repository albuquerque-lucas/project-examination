export const formatDate = (dateString: string | Date): string => {
  if (typeof dateString === 'string') {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  } else {
    throw new Error('formatDate expects a string representing a date');
  }
};