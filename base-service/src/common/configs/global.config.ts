import * as dotenv from 'dotenv';
import { RecursiveKeyOf } from 'shared';
dotenv.config();

const globalConfig = {
  environment: process.env.NODE_ENV,

  auth: {
    accessToken: {
      secret: process.env.AUTH_JWT_ACCESS_TOKEN_KEY,
      algorithm: 'HS256',
      expiresTime: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRE,
    },

    refreshToken: {
      secret: process.env.AUTH_JWT_REFRESH_TOKEN_KEY,
      algorithm: 'HS256',
      expiresTime: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRE,
    },

    verificationExpires: 86400, // seconds = 24h
  },

  sendGrid: {
    apiKey: process.env.SG_API_KEY,
    sender: process.env.SG_SENDER,
    templateId: {
      verificationEmail: process.env.SG_TEMPLATE_VERIFICATION_EMAIL,
      resetPassword: process.env.SG_TEMPLATE_RESET_PASSWORD,
    },
  },
};

export default globalConfig;
export type GlobalConfig = Record<RecursiveKeyOf<typeof globalConfig>, string>;
