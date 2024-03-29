import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatSchema } from './cat.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Cat',
      schema: CatSchema,
    }])
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // Để có thể sử dụng ở các module khác
})
export class CatsModule {}
