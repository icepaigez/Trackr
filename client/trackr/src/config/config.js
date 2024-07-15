const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const getApiUrl = (endpoint) => `${apiBaseUrl}${endpoint}`;