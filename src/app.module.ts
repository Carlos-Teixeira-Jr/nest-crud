import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://users-nest:root@cluster0.xibdppj.mongodb.net/test"),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
