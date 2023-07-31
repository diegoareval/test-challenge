import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { createWriteStream } from 'fs';
import { config } from '../shared/config/env.config';
import axios from 'axios';
import { OutputDto } from './types/output.dto';
import { EmailRequestDTO } from './dtos/email-request.dto';

@Injectable()
export class EmailService {
  constructor(@Inject('MAIL_TRANSPORTER') private transporter: Transporter) {}

  /** 
  @deprecated
   **/
  async sendEmailWithAttachmentUrl(
    request: EmailRequestDTO,
  ): Promise<OutputDto | null> {
    const {
      url,
      recipient,
      subject = 'Code challenge',
      text = 'test data',
    } = request;
    try {
      // Download the JSON file from the URL
      const response = await axios.get(url, { responseType: 'stream' });
      const jsonFileName = 'attachment.json';

      // Save the downloaded file to the server
      const fileStream = createWriteStream(jsonFileName);
      response.data.pipe(fileStream);

      // Wait for the file to be saved
      await new Promise((resolve) => fileStream.on('finish', resolve));

      // Send the email with the downloaded JSON file as an attachment
      const info = await this.transporter.sendMail({
        from: config.USER_EMAIL,
        to: recipient,
        subject,
        text,
        attachments: [
          {
            filename: jsonFileName,
            path: jsonFileName,
          },
        ],
      });

      return {
        status: true,
        messageId: info.messageId,
        json: response.data || null,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to send email with attachment.',
      );
    }
  }

  async sendEmailWithStream(
    file: Express.Multer.File,
    recipient: string,
  ): Promise<OutputDto | null> {
    try {
      const attachmentName = file.originalname;
      const attachmentData = file.buffer;

      const info = await this.transporter.sendMail({
        from: config.USER_EMAIL,
        to: recipient,
        subject: 'Email with JSON Attachment',
        text: 'sending data.',
        attachments: [
          {
            filename: attachmentName,
            content: attachmentData,
          },
        ],
      });

      return {
        status: true,
        messageId: info.messageId,
        json: JSON.parse(attachmentData.toString()),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to send email with attachment.',
      );
    }
  }
}
