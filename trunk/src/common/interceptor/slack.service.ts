import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
@Global()
export class SlackService {
  private readonly slackWebhookUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.slackWebhookUrl = this.configService.get('BONG_SLACK_WEBHOOK_URL');
  }

  log(message: string): void {
    // 로깅 메시지를 슬랙으로 보내는 HTTP POST 요청을 보냅니다
    this.httpService
      .post(this.slackWebhookUrl, { text: message })
      .subscribe((response: AxiosResponse) => {
        // 요청이 성공했을 경우 추가적인 작업을 수행합니다
        // console.log(response.status);
      });
  }
}
