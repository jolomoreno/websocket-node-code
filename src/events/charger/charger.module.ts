import { Module } from '@nestjs/common';
import { ChargerGateway } from './charger.gateway';

@Module({
  providers: [ChargerGateway],
})
export class ChargerModule {}
