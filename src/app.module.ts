import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConverterModule} from './converter/converter.module';
import {EmailModule} from './email/email.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [ConverterModule, EmailModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
