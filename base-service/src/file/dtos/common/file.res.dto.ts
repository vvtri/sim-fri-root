import { AudienceType, FileType } from 'shared';
import { UserResDto } from '../../../auth/dtos/common/res/user.res.dto';
import { File } from '../../entities/file.entity';

export interface FileResDtoParams {
  data?: File;
}

export class FileResDto {
  id: number;
  key: string;
  bucket: string;
  size: string;
  audienceType: AudienceType;
  fileType: FileType;
  user: UserResDto;
  url: string;

  static mapProperty(dto: FileResDto, { data }: FileResDtoParams) {
    dto.id = data.id;
    dto.key = data.key;
    dto.bucket = data.bucket;
    dto.size = data.size;
    dto.audienceType = data.audienceType;
    dto.fileType = data.fileType;
    dto.url = `https://${data.bucket}.s3.amazonaws.com/${data.key}`;
  }

  static forUser(params: FileResDtoParams) {
    const { data } = params;

    if (!data) return null;
    const result = new FileResDto();

    this.mapProperty(result, params);

    result.user = UserResDto.forUser({ data: data.user });

    return result;
  }
}
