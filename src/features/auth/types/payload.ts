export type Payload = {
  sub: string;
  email: string;
};

export type AuthenticatedUser = Payload;

export type TokenPayload = Payload & {
  iat: number;
  exp: number;
};
