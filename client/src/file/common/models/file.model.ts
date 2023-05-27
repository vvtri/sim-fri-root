import { IUser } from '../../../auth/common/interfaces/res/user.res.interface';

export interface IFile {
  id: number;
  key: string;
  bucket: string;
  size: string;
  audienceType: string;
  fileType: string;
  user?: IUser;
  url: string;
}
