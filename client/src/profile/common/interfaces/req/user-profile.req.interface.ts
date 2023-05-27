import { UserProfileRelationshipStatus } from 'shared';

export interface IUpdateUserProfileReq {
  address?: string;
  name?: string;
  birthDate?: Date;
  workplace?: string;
  school?: string;
  hometown?: string;
  relationshipStatus?: UserProfileRelationshipStatus;
  avatarId?: number;
}
