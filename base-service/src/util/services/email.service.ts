import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgClient from '@sendgrid/mail';
import { GlobalConfig } from '../../common/configs/global.config';

@Injectable()
export class EmailService {
  private from: string;
  constructor(configService: ConfigService<GlobalConfig>) {
    sgClient.setApiKey(configService.get('sendGrid.apiKey'));
    this.from = configService.get('sendGrid.sender');
  }

  async send(
    data: Pick<
      sgClient.MailDataRequired,
      'to' | 'dynamicTemplateData' | 'templateId'
    >,
  ) {
    await sgClient.send({
      ...(data as any),
      from: this.from,
    });
  }
}
