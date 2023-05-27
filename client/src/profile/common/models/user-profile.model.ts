import { UserProfileRelationshipStatus } from 'shared';
import { IUser } from '../../../auth/common/interfaces/res/user.res.interface';
import { IFile } from '../../../file/common/models/file.model';

export interface IUserProfile {
  id: string;
  address: string;
  name: string;
  birthDate: string;
  workplace: string;
  school: string;
  hometown: string;
  relationshipStatus: UserProfileRelationshipStatus;
  avatar?: IFile;
  user?: IUser;
}
