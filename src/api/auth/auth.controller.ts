import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.findByUsername(registerDto.username);
    if(user) {
      throw new BadRequestException('Username is already existed');
    }
  }
}
