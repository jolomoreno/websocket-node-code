import { Module } from '@nestjs/common';
import { WidgetGateway } from './widget.gateway';

@Module({
  providers: [WidgetGateway],
})
export class WidgetModule {}
