import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Client, Server } from 'socket.io';
import { Message } from '../message';

@WebSocketGateway(3100, { namespace: 'chargers/c1234' })
export class WidgetGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('widget')
  // async chargingStatusToWidget(client: Client, message: Message): Promise<Message> {
  //   this.server.emit('widget', message);
  //   return message;
  // }

@SubscribeMessage('widget')
   async chargingStatusToWidget(client: any, message: Message): Promise<void> {
      client.on('widget', (data) => {
        console.log(data, '<<<<<<< DATA IN WIDGET');
      });
   }
}
