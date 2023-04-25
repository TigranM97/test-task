import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { typeOrmConfig } from './config/ormconfig';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    FriendsModule,
    FriendRequestModule,
  ],
})
export class AppModule {}
