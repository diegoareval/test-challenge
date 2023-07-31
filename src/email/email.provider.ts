import { Provider } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from '../shared/config/env.config';

export const NodeMailerProvider: Provider = {
  provide: 'MAIL_TRANSPORTER',
  useFactory: () =>
    nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.USER_EMAIL,
        pass: config.USER_PASSWORD,
      },
    }),
};