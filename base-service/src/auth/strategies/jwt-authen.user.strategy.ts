import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UnAuthorizedExc } from 'common';
import dayjs from 'dayjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStatusCode } from 'shared';
import { GlobalConfig } from '../../common/configs/global.config';
import { StrategyName } from '../constants/index.constant';
import { UserRepository } from '../repositories/user.repository';
import { JwtAuthPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtAuthenUserStrategy extends PassportStrategy(
  Strategy,
  StrategyName.USER,
) {
  constructor(
    private readonly userRepo: UserRepository,
    configService: ConfigService<GlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.accessToken.secret'),
      algorithms: [configService.get('auth.accessToken.algorithm')],
    });
  }

  async validate(payload: JwtAuthPayload) {
    const { userId, exp } = payload;

    if (dayjs.unix(exp).isBefore(dayjs())) {
      throw new UnAuthorizedExc({
        statusCode: AuthStatusCode.ACCESS_TOKEN_EXPIRES,
      });
    }

    const [user] = await this.userRepo.find({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
