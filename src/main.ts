import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from './shared/config/env.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap();
