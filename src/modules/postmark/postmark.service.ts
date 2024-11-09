import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';
import { PostMarkClient } from './postmark.client';

@Injectable()
export class PostMarkService {
  constructor(private readonly postMarkClient: PostMarkClient) {}

  async sendEmail(
    to: string,
    subject: string,
    body: string,
  ): Promise<postmark.Models.MessageSendingResponse> {
    const mail: postmark.Models.Message = {
      From: 'm.halawi@optidist.com',
      To: to,
      Subject: subject,
      TextBody: body,
    };

    return await this.postMarkClient.send(mail);
  }

  async sendEmailWithTemplate(
    to: string,
    templateId: number,
    templateData: any,
  ): Promise<postmark.Models.MessageSendingResponse> {
    const mail: postmark.Models.TemplatedMessage = {
      From: 'm.halawi@optidist.com',
      To: to,
      TemplateId: templateId,
      TemplateModel: templateData,
    };

    return await this.postMarkClient.sendTemplated(mail);
  }
}
