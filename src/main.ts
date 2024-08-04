import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:10001',
      'https://account-front.keylotus.net',
      'https://artst.keylotus.net',
      'https://dg.keylotus.net',
    ],
  });
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  await app.listen(3001);
}
bootstrap();
