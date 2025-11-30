import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
