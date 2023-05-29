import { Injectable } from '@nestjs/common';
import { KafkaListener, SubscribeTo } from '@vvtri/nestjs-kafka';
import { EachMessagePayload } from '@vvtri/nestjs-kafka/dist/src/interfaces/external.interface';
import {
  KAFKA_TOPIC,
  UserProfileCreatedKafkaPayload,
  UserProfileUpdatedKafkaPayload,
} from 'common';
import { Transactional } from 'typeorm-transactional';
import { UserProfileRepository } from '../repositories/user-profile.repository';

@KafkaListener()
@Injectable()
export class UserProfileListenerService {
  constructor(private userProfileRepo: UserProfileRepository) {}

  @SubscribeTo(KAFKA_TOPIC.USER_PROFILE_CREATED)
  @Transactional()
  async handleUserProfileCreated({
    message,
  }: EachMessagePayload<UserProfileCreatedKafkaPayload>) {
    const userProfile = this.userProfileRepo.create(message.value);
    await this.userProfileRepo.insert(userProfile);
  }

  @SubscribeTo(KAFKA_TOPIC.USER_PROFILE_UPDATED)
  @Transactional()
  async handleUserProfileUpdated({
    message,
  }: EachMessagePayload<UserProfileUpdatedKafkaPayload>) {
    await this.userProfileRepo.update(message.value.id, message.value);
  }
}
