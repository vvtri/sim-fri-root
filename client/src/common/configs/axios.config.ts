import axios from 'axios';
import { refreshTokenUrl } from '../../auth/common/apis/index.api';
import { RefreshTokenPayload } from '../../auth/common/interfaces/payload/refresh-token.payload';
import { IAuthTokenRes } from '../../auth/common/interfaces/res/auth-token.res.interface';
import {
  BASE_URL,
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
} from '../constants/index.constant';
import { IApiError } from '../interfaces/api-error.interface';
import { AuthStatusCode } from '../status-code/auth.status-code';
import { getRefreshToken, saveAccessToken } from '../utils/auth.util';

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    __retry: boolean;
  }
}

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    LOCAL_STORAGE_AUTH_TOKEN_KEY.ACCESS_TOKEN,
  )}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    if (
      axios.isAxiosError(error) &&
      (error.response?.data as IApiError).statusCode ===
        AuthStatusCode.INVALID_ACCESS_TOKEN
    ) {
      let originalRequest = error.config;

      if (originalRequest && !originalRequest.__retry) {
        originalRequest.__retry = true;

        const refreshToken = getRefreshToken();
        if (!refreshToken) throw error;

        // Refresh token without interceptor
        const { accessToken } = await axiosClient.post<
          any,
          IAuthTokenRes,
          RefreshTokenPayload
        >(`${BASE_URL}${refreshTokenUrl}`, { refreshToken });
        saveAccessToken(accessToken);

        // Perform original request
        return axiosClient(originalRequest);
      }
    }
    throw error;
  },
);

export default axiosClient;
