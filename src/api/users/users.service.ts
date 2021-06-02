import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';

import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model < User > ) {}

  async create(user: RegisterDto): Promise<User> {
    const newUser = new this.userModel({
      username: user.username,
      password: user.password
    })
    return await newUser.save();
  }

  async findByUsername(username: string): Promise < User > {
    try {
      return await this.userModel.findOne({
        username
      });
    } catch (error) {
      return null;
    }
  }
}
