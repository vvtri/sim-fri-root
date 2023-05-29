import { ConsumerConfig, KafkaConfig } from '@vvtri/nestjs-kafka';
import dotenv from 'dotenv';
dotenv.config();

export const kafkaConfig: KafkaConfig = {
  clientId: 'message-service',
  brokers: [process.env.KAFKA_SERVER],
  connectionTimeout: 45000,
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_SECRET,
  },
};

export const consumerConfig: ConsumerConfig = {
  groupId: 'message-service',
  allowAutoTopicCreation: false,
};
