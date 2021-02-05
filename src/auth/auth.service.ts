import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jws-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
    private jwtService:JwtService,
  ) { }
  
  async signUp(authCredentialsDto: AuthCredentialsDto) :Promise<void>{
    return this.UserRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken:string}>{
    const username = await this.UserRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload : JwtPayload= { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
