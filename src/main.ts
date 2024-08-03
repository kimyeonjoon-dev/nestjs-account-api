import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'https://account.keylotus.net',
      'https://artst.keylotus.net',
    ],
  });
  await app.listen(3001);
}
bootstrap();
