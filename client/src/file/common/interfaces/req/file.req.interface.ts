import { AudienceType, FileType } from 'shared';

export interface IPresignFileReq {
  fileType: FileType;
  audienceType: AudienceType;
}
