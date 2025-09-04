export function getErrorMessage(error: any, customMessage?: string) {
  if (!error) {
    return null;
  }
  let errorMessage = '';
  if (error.response?.data) {
    errorMessage =
      typeof error.response.data.error === 'string'
        ? error.response.data.error
        : error.response.data.error.message;
  }
  return errorMessage || customMessage || 'Something went wrong. Please try again.';
}
