import { Body, Controller, Post } from '@nestjs/common/decorators';
import { Users } from 'src/users/users.entity';
import { AuthService } from './auth.service';

interface Login {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signIn')
  public signIn(@Body() user: Login): Promise<Users> {
    return this.authService.signIn(user);
  }
}
