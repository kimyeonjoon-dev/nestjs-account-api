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
  async login(
    @Body() loginDto: Record<string, any>,
    // @Res(
    //   // { passthrough: true }
    //   ) res: Response,
  ) {
    // , @Res() res
    const ret = await this.authService.login(loginDto);
    console.log(ret);
    console.log(process.env.DOMAIN_URL);
    // res.cookie('access_token', ret, {
    //   httpOnly: true,
    //   domain: process.env.DOMAIN_URL,
    //   path: '/',
    //   expires: new Date(Date.now() + 1000 * 60 * 5),
    // });
    return ret;
    // return ret;
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
    return { ret: 'ok' };
  }

  @UseGuards(AuthGuard)
  @Post('user-info')
  getUserInfo(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('check')
  check(@Request() req, @Body() dto: Record<string, any>) {
    return this.authService.checkReissue(req.user, dto);
  }
}
