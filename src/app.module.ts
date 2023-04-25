import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { FriendRequestModule } from './friend-request/friend-request.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'social-website',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    FriendsModule,
    FriendRequestModule,
  ],
})
export class AppModule {}
