import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { FriendsDTO } from './dto/friends.dto';
import { Friends } from './friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
    private usersService: UsersService
  ) { }

  async addFriend(user1id: number, user2id: number): Promise<FriendsDTO> {
    return this.friendsRepository.save({ user1id, user2id })
  }

  getAllMyFriends(userId: number): Promise<FriendsDTO[]> {
    return this.friendsRepository.find({
      where: [
        { user1id: userId },
        { user2id: userId },
      ]
    })
  }

}
