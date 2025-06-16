import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => instanceToPlain(user));
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? instanceToPlain(user) : null;
  }

  async create(createUserDto: CreateUserDto) {
    const now = Date.now();

    const newUser = this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });

    const savedUser = await this.userRepository.save(newUser);
    return instanceToPlain(savedUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    const updatedUser = await this.userRepository.save(user);
    return instanceToPlain(updatedUser);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
