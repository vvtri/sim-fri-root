import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CustomException, ForbiddenExc } from 'common';
import { AuthStatusCode } from 'shared';
import { IS_PUBLIC_KEY } from '../../common/constants/index.constant';
import { StrategyName } from '../constants/index.constant';

@Injectable()
export class JwtAuthenUserGuard extends AuthGuard(StrategyName.USER) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err instanceof CustomException) throw err;

    if (info instanceof Error || !user || err)
      throw new ForbiddenExc({
        statusCode: AuthStatusCode.INVALID_ACCESS_TOKEN,
      });

    return user;
  }
}
