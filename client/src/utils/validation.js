export const validateField = (name, value) => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  
  switch (name) {
    case 'displayName':
      return value.trim() ? '' : 'Display name is required';
    case 'linkedinUrl':
      return !value || urlRegex.test(value) ? '' : 'Please enter a valid LinkedIn URL';
    case 'githubUrl':
      return !value || urlRegex.test(value) ? '' : 'Please enter a valid GitHub URL';
    default:
      return '';
  }
}; 