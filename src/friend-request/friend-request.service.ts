import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicResponseType } from '../dto/BasicResponseType';
import { FriendsService } from '../friends/friends.service';
import { Repository } from 'typeorm';
import { FriendRequest } from './friendRequest.entity';
import { FriendRequestDTO } from './dto/frieend-request.dto';
import { UsersService } from 'src/users/users.service';
import { UsersDTO } from 'src/users/dto/users.dto';

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectRepository(FriendRequest)
        private friendRequestRepository: Repository<FriendRequest>,
        private friendsService: FriendsService,
        private usersService: UsersService
    ) { }

    async sendFriendRequest(userFromId: number, userToId: number): Promise<FriendRequestDTO> {
        const friendRequest = await this.friendRequestRepository.findOne({ where: { userFromId, userToId } })
        if (friendRequest) {
            throw new HttpException('ALready send', HttpStatus.BAD_REQUEST);
        }
        return this.friendRequestRepository.save({ userFromId, userToId })
    }

    async acceptFriendRequest(userFromId: number, userToId: number): Promise<BasicResponseType> {
        await Promise.all([
            this.checkFriendRequest(userToId, userFromId),
            this.friendsService.addFriend(userFromId, userToId),
            this.friendRequestRepository.softDelete({ userToId, userFromId })
        ])
        return {
            message: "Accepted",
            status: 200
        }
    }

    async ignoreFriendRequest(userFromId: number, userToId: number): Promise<BasicResponseType> {
        await Promise.all([
            this.checkFriendRequest(userFromId, userToId),
            this.friendRequestRepository.softDelete({ userFromId, userToId })
        ])
        return {
            message: "Ignored",
            status: 200
        }
    }

    async checkFriendRequest(userFromId: number, userToId: number): Promise<void> {
        const friendRequest = await this.friendRequestRepository.findOne({ where: { userFromId, userToId } })
        if (!friendRequest) {
            throw new HttpException('request not found', HttpStatus.BAD_REQUEST);
        }
    }

    async showFriendRequestList(userId): Promise<UsersDTO[]>{
        const requests = await this.friendRequestRepository.find({where: {userToId: userId}})
        const ids = requests.map(el => {
            return el.userFromId
        })
        return this.usersService.findUserWithIds(ids)
    }
}
