import { IsNotEmpty, IsUrl, IsEmail, IsString } from 'class-validator';

export class EmailRequestDTO {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @IsString()
  text: string;

  @IsString()
  subject: string;
}
