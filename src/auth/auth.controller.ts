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
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() loginDto: Record<string, any>,
    // @Res({ passthrough: true }) res: Response,
  ) {
    const ret = await this.authService.login(loginDto);
    
    // if( !ret.error ) {
    //   res.cookie('token', ret.accessToken, {
    //     httpOnly: true,
    //     domain: process.env.DOMAIN_URL,
    //     path: '/',
    //     expires: new Date(Date.now() + 1000 * 60 * 5),
    //   });
    // }
    return ret;
  }

  @Post('logout')
  public async logout(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
    // @Body() dto: Record<string, any>,
  ) {
    console.log('logout1');
    // console.log(req)
    res.cookie('token', '', {
      path: '/',
      expires: new Date(0),
    });
    res.cookie('token', '', {
      domain: process.env.DOMAIN_URL,
      path: '/',
      expires: new Date(0),
    });

    console.log('logout4');
    // console.log(req.user);
    // return { ret: 'ok' };
  }

  @UseGuards(JwtGuard)
  @Post('get-user-info')
  public getUserInfo(@Request() req) {
    if (req.user) {
      return req.user;  
    }
    return { error: 1, message : "not valid"}
  }

  @UseGuards(JwtGuard)
  @Post('check')
  public async check(@Request() req, @Body() dto: Record<string, any>) {
    return await this.authService.checkReissue(req.user, dto);
  }
}
