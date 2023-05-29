import { UserProfileRelationshipStatus } from 'shared';
import { UserResDto } from '../../../../auth/dtos/common/res/user.res.dto';
import { FileResDto } from '../../../../file/dtos/common/file.res.dto';
import { UserProfile } from '../../../entities/user-profile.entity';

export interface UserProfileResDtoParams {
  data?: UserProfile;
}

export class UserProfileResDto {
  id: number;
  address: string;
  name: string;
  birthDate: Date;
  workplace: string;
  school: string;
  hometown: string;
  relationshipStatus: UserProfileRelationshipStatus;
  avatar: FileResDto;
  user: UserResDto;

  static mapProperty(
    dto: UserProfileResDto,
    { data }: UserProfileResDtoParams,
  ) {
    dto.id = data.id;
    dto.address = data.address;
    dto.name = data.name;
    dto.birthDate = data.birthDate;
    dto.workplace = data.workplace;
    dto.school = data.school;
    dto.hometown = data.hometown;
    dto.relationshipStatus = data.relationshipStatus;
  }

  static forUser(params: UserProfileResDtoParams) {
    const { data } = params;

    if (!data) return null;
    const result = new UserProfileResDto();

    this.mapProperty(result, params);

    result.avatar = FileResDto.forUser({ data: data.avatar });
    result.user = UserResDto.forUser({ data: data.user });

    return result;
  }
}
