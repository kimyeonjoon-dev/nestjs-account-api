import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: Record<string, any>) {
    // , @Res() res
    const ret = await this.authService.login(
      loginDto.email,
      loginDto.password,
      loginDto.returnUrl,
    );
    console.log(ret);
    return ret;
    // if (ret) {
    //   // return res.redirect(
    //   //   `${loginDto.returnUrl}/?access_token=${ret.access_token}`,
    //   // );
    //   return ret
    // }
  }

  @Post('logout')
  async logout() {
    // @Request() req, @Res({ passthrough: true }) res: Response
    // res.cookie('access_token', '', {      
    //   path: '/',
    //   expires: new Date(0),
    // });
    console.log('logout');
    return { "ret" : "ok"}
  }

  @UseGuards(AuthGuard)
  @Post('user-info')
  getUserInfo(@Request() req) {
    return req.user;
  }
}
