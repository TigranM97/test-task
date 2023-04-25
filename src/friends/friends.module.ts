import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { FriendsController } from './friends.controller';
import { Friends } from './friends.entity';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friends]),
  UsersModule
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService]
})
export class FriendsModule { }
