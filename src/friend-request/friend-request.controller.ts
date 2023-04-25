import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasicResponseType } from 'src/dto/BasicResponseType';
import { CurrentUser } from 'src/guards/current-user';
import { JWTAuthGuard } from 'src/guards/jwt-guards';
import { UsersDTO } from 'src/users/dto/users.dto';
import { Users } from 'src/users/users.entity';
import { FriendRequestDTO } from './dto/frieend-request.dto';
import { FriendRequestService } from './friend-request.service';

interface FriendRequest {
    userId: number
}

@Controller('friend-request')
export class FriendRequestController {
    constructor(private friendRequestService: FriendRequestService,
    ) { }

    @UseGuards(JWTAuthGuard)
    @Post('send')
    sendFriendRequest(
        @Body() { userId },
        @CurrentUser() { id }: Users): Promise<FriendRequestDTO> {
        return this.friendRequestService.sendFriendRequest(id, userId)
    }

    @UseGuards(JWTAuthGuard)
    @Post('accept')
    acceptFriendRequest(@Body() { userId }: FriendRequest, @CurrentUser() { id }: Users): Promise<BasicResponseType> {
        return this.friendRequestService.acceptFriendRequest(id, userId)
    }

    @UseGuards(JWTAuthGuard)
    @Post('ignore')
    ignoreFriendRequest(@Body() { userId }: FriendRequest, @CurrentUser() { id }: Users): Promise<BasicResponseType> {
        return this.friendRequestService.ignoreFriendRequest(id, userId)
    }

    @UseGuards(JWTAuthGuard)
    @Get('list')
    showFriendRequestList( @CurrentUser() { id }: Users): Promise<UsersDTO[]> { //more easy with GraphQL(ResolveField)
        return this.friendRequestService.showFriendRequestList(id)
    }
}
