import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenUserGuard } from '../../auth/guards/jwt-authen.user.guard';
import { IS_PUBLIC_KEY } from '../constants/index.constant';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(JwtAuthenUserGuard), ApiBearerAuth());
