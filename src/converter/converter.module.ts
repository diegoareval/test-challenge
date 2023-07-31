import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConvertService } from './converter.service';

@Module({
  controllers: [ConverterController],
  providers: [ConvertService],
})
export class ConverterModule {}
