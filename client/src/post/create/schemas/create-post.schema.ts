import { AudienceType } from 'shared';
import { InferType, mixed, object, string } from 'yup';

export const createPostSchema = object({
  content: string().required().trim(),
  audienceType: mixed<AudienceType>()
    .oneOf(Object.values(AudienceType))
    .required(),
});

export interface ICreatePostForm extends InferType<typeof createPostSchema> {}
