import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat } from './cat.model';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(cat: CreateCatDto): Promise<Cat> {
    const newCat = new this.catModel({
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    });
    return await newCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    try {
      return await this.catModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find cat!');
    }
  }
}
