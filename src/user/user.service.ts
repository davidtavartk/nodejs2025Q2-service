import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async getAllUsers() {
    return 'This action returns all users';
  }

  async getUserById(id: string) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
