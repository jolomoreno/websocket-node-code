import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Client, Server } from 'socket.io';
import { Message } from '../message';

@WebSocketGateway(3200, { namespace: 'widgets/wABCD' })
export class WidgetGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('widget')
  async chargingStatus(): Promise<void> {
  const message: Message = {
    event: 'chargingStatus',
      data: {
      status: 'charging',
    },
  };
  console.log(message, '<<<<<<<<< Message in widget');
  this.server.emit('widget', message);
  }
}
