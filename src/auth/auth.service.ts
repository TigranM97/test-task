import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private configService: ConfigService,
        private readonly jwtService: JwtService,
      ) {}

    async signIn(data): Promise<any> {
        const { email,password } = data;
        if (!email && !password) {
            throw new HttpException('Incomplete credentials', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        if(!await bcrypt.compare(password, user.password)){
          throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        const token = await this.generateAuthToken(user.email, user.id);
        return {
          token: token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }

      async generateAuthToken(email: string, id): Promise<String> {
        const payload = { email, id };
        return this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SCRET_KEY'),
          expiresIn: 1000,
        });
      }

}
