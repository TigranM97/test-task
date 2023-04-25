import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/guards/current-user';
import { JWTAuthGuard } from 'src/guards/jwt-guards';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { FriendsDTO } from './dto/friends.dto';
import { Friends } from './friends.entity';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService,
  ) { }

  @UseGuards(JWTAuthGuard)
  @Get('allFriends')
  getAllMyFriends(@CurrentUser() { id }: Users): Promise<FriendsDTO[]> {
    return this.friendsService.getAllMyFriends(id)
  }
}
