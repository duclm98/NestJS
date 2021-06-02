import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './api/auth/auth.module';
import { CatsModule } from './api/cats/cats.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://LeMinhDuc1:cYo8sYZfCS5NVWJL@cluster0.yy3b1.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
    CatsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(comsumer: MiddlewareConsumer) {
    comsumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
