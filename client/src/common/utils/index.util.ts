import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '../constants/index.constant';

export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY.ACCESS_TOKEN, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY.ACCESS_TOKEN);
};

export const deleteAccessToken = () => {
  return localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY.ACCESS_TOKEN);
};

export const saveRefreshToken = (refreshToken: string) => {
  localStorage.setItem(
    LOCAL_STORAGE_AUTH_TOKEN_KEY.REFRESH_TOKEN,
    refreshToken,
  );
};

export const getRefreshToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY.REFRESH_TOKEN);
};

export const deleteRefreshToken = () => {
  return localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY.REFRESH_TOKEN);
};
