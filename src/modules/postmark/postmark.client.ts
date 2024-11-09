import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class PostMarkClient {
  private client: postmark.ServerClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new postmark.ServerClient(
      this.configService.getOrThrow<string>('post_mark'),
    );
  }

  public send(
    mail: postmark.Models.Message,
  ): Promise<postmark.Models.MessageSendingResponse> {
    try {
      return this.client.sendEmail(mail);
    } catch (error) {
      throw new Error(error);
    }
  }

  public sendTemplated(
    mail: postmark.Models.TemplatedMessage,
  ): Promise<postmark.Models.MessageSendingResponse> {
    try {
      return this.client.sendEmailWithTemplate(mail);
    } catch (error) {
      throw new Error(error);
    }
  }
}
