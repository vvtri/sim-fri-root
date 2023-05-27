import { UserProfileRelationshipStatus } from 'shared';
import { InferType, date, mixed, number, object, string } from 'yup';

export const editProfileSchema = object({
  name: string().required(),
  avatarId: number().optional(),
  address: string().optional(),
  birthDate: date().optional(),
  workplace: string().optional(),
  school: string().optional(),
  hometown: string().optional(),
  relationshipStatus: mixed<UserProfileRelationshipStatus>()
    .oneOf(
      Object.values(
        UserProfileRelationshipStatus,
      ) as UserProfileRelationshipStatus[],
    )
    .required(),
});

export interface IEditProfileForm extends InferType<typeof editProfileSchema> {}
