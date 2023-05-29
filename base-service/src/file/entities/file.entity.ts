import { BaseEntity } from 'common';
import { AudienceType, FileType } from 'shared';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserProfile } from '../../auth/entities/user-profile.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255 })
  key: string;

  @Column({ length: 255 })
  bucket: string;

  @Column({ default: 0 })
  size: string;

  @Column({ type: 'enum', enum: AudienceType })
  audienceType: AudienceType;

  @Column({ type: 'enum', enum: FileType })
  fileType: FileType;

  // join user
  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.files)
  @JoinColumn()
  user: User;
  // end join user

  @OneToOne(() => UserProfile, (up) => up.avatar)
  userProfile: UserProfile;
}
