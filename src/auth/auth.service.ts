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
    email: string,
    password: string,
    returnUrl: string,
  ): Promise<any> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      const payload = { sub: user.userId, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        returnUrl: returnUrl,
      };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
