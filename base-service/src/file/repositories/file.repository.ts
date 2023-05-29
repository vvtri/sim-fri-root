import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'common';
import { DataSource } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository extends BaseRepository<File> {
  constructor(dataSource: DataSource) {
    super(File, dataSource);
  }
}
