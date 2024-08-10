import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      email: 'test@test.com',
      password: 'test',
    },
    {
      userId: 2,
      email: 'test2@test.com',
      password: 'test2',
    },
  ];

  async login(
    loginDto: any,
    // email: string,
    // password: string,
    // returnUrl: string,
  ): Promise<any> {
    const user = this.users.find(
      (user) =>
        user.email === loginDto.email && user.password === loginDto.password,
    );
    console.log('login: %s %s', loginDto.email, loginDto.clientId);
    if (user) {
      const payload = { sub: user.userId, email: user.email };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        returnUrl: loginDto.returnUrl,
      };
    } else {
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      return { error: 1, message: "wrong id, password"}
    }
  }

  async checkReissue(user: any, dto: any) {
    // console.log('checkReissue: %s %s', user.email, dto.clientId);
    // console.log(user);
    if (user) {
      const payload = { sub: user.sub, email: user.email };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        returnUrl: dto.returnUrl,
      };
    } else {
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      return { error: 1, message: 'not valid' };
    }
  }
}
