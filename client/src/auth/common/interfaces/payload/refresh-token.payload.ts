import { NonFunctionProperties } from 'shared/dist/src/types';

export class RefreshTokenPayload {
  refreshToken!: string;

  constructor(data: NonFunctionProperties<RefreshTokenPayload>) {
    Object.assign(this, data);
  }
}
