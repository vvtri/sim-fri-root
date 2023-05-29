import { BaseEntity } from 'common';
import { UserStatus } from 'shared';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  @Column({ name: 'phone_number', length: 50, nullable: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @OneToMany(() => File, (f) => f.user)
  files: File[];

  @OneToOne(() => UserProfile, (up) => up.user)
  userProfile: UserProfile;
}
