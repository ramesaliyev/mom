import { Module } from '@nestjs/common';

import { MQService } from './services/mq.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MQService],
  exports: [MQService],
})
export class HubModule {}