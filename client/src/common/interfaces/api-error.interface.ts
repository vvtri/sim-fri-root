import { AuthStatusCode } from '../status-code/auth.status-code';

export interface IApiError {
  httpStatus: number;
  statusCode: (typeof AuthStatusCode)[keyof typeof AuthStatusCode];
}
