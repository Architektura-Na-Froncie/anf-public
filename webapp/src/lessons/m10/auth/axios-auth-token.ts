import axios, { AxiosRequestConfig } from  'axios'

export const setAuthorizationHeader = (token: string) => {
  const includeToken = (config: AxiosRequestConfig) => {
    if (token) {
      config.headers!.Authorization = token;
    }
    return config;
  }

  const interceptor = axios.interceptors.request.use(includeToken);

  return () => {
    axios.interceptors.request.eject(interceptor);
  }
}
