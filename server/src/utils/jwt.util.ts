import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: {
  userId: string;
  email: string;
  role: string;
}) => {
  return jwt.sign(
    payload,
    env.JWT_SECRET as string,
    {
      expiresIn: env.JWT_EXPIRES_IN as string,
    } as SignOptions,
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
