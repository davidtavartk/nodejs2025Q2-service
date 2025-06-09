import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'node:crypto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers() {
    return this.users;
  }

  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return instanceToPlain(user);
  }

  async create(createUserDto: CreateUserDto) {
    const now = Date.now();

    const newUser = new User();
    newUser.id = randomUUID();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = now;
    newUser.updatedAt = now;

    this.users.push(newUser);
    return instanceToPlain(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return instanceToPlain(user);
  }

  async remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}
