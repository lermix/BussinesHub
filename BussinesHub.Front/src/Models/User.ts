export interface VerifiedUser {
  username: string | undefined;
  roles: string | undefined;
  token: string | undefined;
}

export class VerifiedUserClass implements VerifiedUser {
  username = undefined;
  roles = undefined;
  token = undefined;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  middleName: string | null;
  surname: string;
  email: string;
  password: string;
  mobileNumber: string | null;
}

export class UserClass implements User {
  id = 0;
  username = "";
  name = "";
  middleName = null;
  surname = "";
  email = "";
  password = "";
  mobileNumber = null;
}
