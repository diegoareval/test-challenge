import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { OutputDto } from './types/output.dto';
import { EmailService } from './email.service';
import {EmailRequestDTO} from './dtos/email-request.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email-optional')
  async sendEmailWithAttachment(@Body() request: EmailRequestDTO): Promise<OutputDto | null> {
    // i marked as deprecated because i am not going to use it.
    return this.emailService.sendEmailWithAttachmentUrl(request);
  }

  @Post('send-email')
  @UseInterceptors(FileInterceptor('file'))
  async sendEmailWithAttachmentFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(json|jpeg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('recipient') recipient: string
  ) {
    return this.emailService.sendEmailWithStream(file, recipient);
  }
}
