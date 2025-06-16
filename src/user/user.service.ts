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
    return users.map((user) => ({
      ...instanceToPlain(user),
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }));
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return {
      ...instanceToPlain(user),
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async getUserByIdRaw(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    });

    const savedUser = await this.userRepository.save(newUser);
    return {
      ...instanceToPlain(savedUser),
      createdAt: savedUser.createdAt.getTime(),
      updatedAt: savedUser.updatedAt.getTime(),
    };
  }

  async createRaw(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    });

    return await this.userRepository.save(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;

    const updatedUser = await this.userRepository.save(user);
    return {
      ...instanceToPlain(updatedUser),
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
