import { userRole } from './enum';

export type JwtPayload = {
  id: number;
  role: userRole;
};
export type userType = {
  id: number;
  role: userRole;
  fullName: string;
  email: string;
  avatar: string | null;
};

export type JwtReturnTypePayload = {
  id: number;
  role: string;
  iat: number;
};
