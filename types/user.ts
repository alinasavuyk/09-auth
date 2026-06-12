export interface User {
  email: string;
  username: string;
  avatar: string;
}
export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};