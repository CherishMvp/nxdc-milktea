const devBaseUrl = 'http://localhost:4000';
const proBaseUrl = 'https://nav.ai0626.online/api';
const isDev = false;
export const baseUrl = isDev ? devBaseUrl : proBaseUrl;
