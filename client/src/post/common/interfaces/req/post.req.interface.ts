import { AudienceType } from 'shared';

export interface IGetListPostsReq {
  userId?: number;
}

export interface ICreatePostReq {
  content: string;
  audienceType: AudienceType;
  fileIds?: number[];
}
