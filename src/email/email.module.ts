import { Module, ValidationPipe } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import {NodeMailerProvider} from './email.provider'
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [EmailController],
  providers: [EmailService, NodeMailerProvider,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }],
})
export class EmailModule {}
