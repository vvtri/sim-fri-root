import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'common';
import { DataSource } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class UserProfileRepository extends BaseRepository<UserProfile> {
  constructor(dataSource: DataSource) {
    super(UserProfile, dataSource);
  }
}
