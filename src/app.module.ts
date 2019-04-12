import { Module } from '@nestjs/common';
import { ChargerModule } from './events/charger/charger.module';
import {WidgetModule} from './events/widget/widget.module';

@Module({
  imports: [ChargerModule, WidgetModule],
})
export class ApplicationModule {}
