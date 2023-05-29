import { BaseEntity } from 'common';
import { UserProfileRelationshipStatus } from 'shared';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { File } from '../../file/entities/file.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  workplace: string;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  hometown: string;

  @Column({ type: 'enum', enum: UserProfileRelationshipStatus, nullable: true })
  relationshipStatus: UserProfileRelationshipStatus;

  // join file
  @Column({ nullable: true })
  avatarId: number;

  @OneToOne(() => File, (f) => f.userProfile)
  @JoinColumn()
  avatar: File;
  // end join file

  // join file
  @Column()
  userId: number;

  @OneToOne(() => User, (u) => u.userProfile)
  @JoinColumn()
  user: User;
  // end join file
}
