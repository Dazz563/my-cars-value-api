import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, username } = createUserDto;
    // Check for email
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // Hash password
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    // Create user
    createUserDto = {
      email,
      password: result,
      username,
    };

    const user = await this.usersService.create(createUserDto);
    // Return user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }
}
