import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signIn(){}
    
    signUp(){
        return {msg: "I am signed up"}
    }
}
