import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import session from 'cookie-session';
import { PrismaClientExceptionFilter } from './modules/prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);

  app.use(
    session({
      keys: [configService.get('session_secret')],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
