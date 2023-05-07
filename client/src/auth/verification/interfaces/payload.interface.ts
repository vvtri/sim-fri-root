export interface IVerifyUserPayload {
  email: string;
  code: string;
}

export interface IResendVerificationPayload {
  email: string;
}
