export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    if (partial.password) {
      delete partial.password;
    }
    Object.assign(this, partial);
  }

  id: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  subscription: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
