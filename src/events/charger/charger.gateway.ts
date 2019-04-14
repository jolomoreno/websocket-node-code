import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Client, Server } from 'socket.io';
import { Message } from '../message';

@WebSocketGateway(3100, { namespace: 'chargers/c1234' })
export class ChargerGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('charger')
  async chargingStatus(client: Client, message: Message): Promise<void> {
    console.log(message, '<<<<<<<<< Message in charger');
    this.server.emit('charger', message);
  }
}
