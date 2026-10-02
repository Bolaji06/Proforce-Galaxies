export interface User {
  id: string;
  name: string;
  email: string;
  dob?: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

export interface CreateUserDto {
  name: string;
  location: string;
  dob: string;
  email?: string;
  avatar?: string;
}
