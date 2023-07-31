import { Body, Controller, Post } from '@nestjs/common';
import { ConvertService } from './converter.service';
import { InputJsonDto } from './dtos';
import {ResponseData} from './types'

@Controller()
export class ConverterController {
  constructor(private readonly jsonConvertService: ConvertService) {}

  @Post('convert')
  convertJson(@Body() json: InputJsonDto): ResponseData {
    return this.jsonConvertService.convert(json);
  }
}
