import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    let user = this.userRepo.create(createUserDto);

    return this.userRepo.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findByEmail(email: string): Promise<User[]> {
    return this.userRepo.find({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    let user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepo.remove(user);
  }
}
