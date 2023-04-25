import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { AuthRegister } from './input/authRegistr';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UsersDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) { }

  async create(authRegister: AuthRegister): Promise<UsersDTO> {
    const { email } = authRegister;
    if (await this.userRepository.findOne({ where: { email: email } })) {
      throw new HttpException('Email aleredy in use', HttpStatus.BAD_REQUEST);
    } else {
      const hashedPassword = await bcrypt.hash(authRegister.password, 12)
      return this.userRepository.save({ ...authRegister, password: hashedPassword });
    }
  }

  searchByName(search): Promise<UsersDTO[]> {
    return this.userRepository.find({
      where: [
        { firstName: search?.firstName },
        { lastName: search?.lastName },
        { age: search?.age }
      ]
    })

  }

  searchUser({ name }): Promise<UsersDTO[]> {
    return this.userRepository.find({
      where:
      { firstName: ILike(`%${name}%`) },
    });
  }

  findUserWithIds(ids: number[]): Promise<UsersDTO[]>{
    return this.userRepository.find({where: {id: In(ids)}})
  }
}
