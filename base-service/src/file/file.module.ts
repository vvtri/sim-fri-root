import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'common';
import { FileRepository } from './repositories/file.repository';
import { FileListenerService } from './services/file-listener.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([FileRepository])],
  providers: [FileListenerService],
})
export class FileModule {}
