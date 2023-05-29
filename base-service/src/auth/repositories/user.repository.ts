import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'common';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }
}
