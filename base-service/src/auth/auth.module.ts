import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmCustomModule } from 'common';
import { GlobalConfig } from '../common/configs/global.config';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';
import { UserListenerService } from './services/user-listener.service';
import { UserProfileListenerService } from './services/user-profile-listener.service';
import { JwtAuthenUserStrategy } from './strategies/jwt-authen.user.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secret: configService.get('auth.accessToken.secret'),
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
    TypeOrmCustomModule.forFeature([UserRepository, UserProfileRepository]),
  ],
  providers: [
    JwtAuthenUserStrategy,
    UserListenerService,
    UserProfileListenerService,
  ],
})
export class AuthModule {}
