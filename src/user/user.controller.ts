import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid user ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid user ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.userService.updatePassword(id, updatePasswordDto);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Old password is incorrect'
      ) {
        throw new HttpException(
          'Old password is incorrect',
          HttpStatus.FORBIDDEN,
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid user ID (not UUID)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleted = await this.userService.remove(id);
    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('', HttpStatus.NO_CONTENT);
  }
}
