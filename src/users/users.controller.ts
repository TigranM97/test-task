import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/guards/current-user';
import { JWTAuthGuard } from 'src/guards/jwt-guards';
import { UsersDTO } from './dto/users.dto';
import { AuthRegister } from './input/authRegistr';
import { Users } from './users.entity';
import { UsersService } from './users.service';


interface Search {
  firstName?: string,
  lastName?: string,
  age?: number
}

interface SearchWithLike {
  name: string
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('signup')
  public create(@Body() user: AuthRegister): Promise<UsersDTO> {
    return this.usersService.create(user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('searchUser')
  searchUser(@Body() search: Search): Promise<UsersDTO[]> { // with COMPLETE  firstName, lastName, age
    return this.usersService.searchByName(search)
  }

  @UseGuards(JWTAuthGuard)
  @Get("searchByName")
  searchUserByName(@Body() search: SearchWithLike): Promise<UsersDTO[]> {
    return this.usersService.searchUser(search)
  }
}
