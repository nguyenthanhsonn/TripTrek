declare const module: any;
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const first = errors[0];
      const message = first && first.constraints ? Object.values(first.constraints)[0] : 'Validation failed';
      return new BadRequestException(message);
    }
  }));
  await app.listen(process.env.PORT ?? 8000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
