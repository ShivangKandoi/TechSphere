export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  return error.message || 'Network error. Please check your connection.';
}; 