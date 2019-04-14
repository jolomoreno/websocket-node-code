import { Test } from '@nestjs/testing';
import { WidgetGateway } from '../src/events/widget/widget.gateway';
import {INestApplication} from '@nestjs/common';
import * as io from 'socket.io-client';
import {Message} from '../src/events/message';

async function createNestApp(...gateways): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
        providers: gateways,
    }).compile();
    return await testingModule.createNestApplication();
}

describe('[WIDGET] E2E Test', () => {
    const messageCharging: Message = {
        event: 'chargingStatus',
        data: {
            status: 'charging',
        },
    };

    let ws;
    let app;

    it(`- Connect, request status and receive mesage from Server -`, async () => {
        app = await createNestApp(WidgetGateway);
        await app.listenAsync(3000);

        ws = io.connect('ws://localhost:3200/widgets/wABCD');
        ws.emit('widget');
        await new Promise(resolve =>
            ws.on('widget', (charger) => {
                expect(charger.event).toEqual('chargingStatus');
                expect(charger.data.status).toEqual('charging');
                resolve();
            }),
        );
        ws.close();
    });
    afterEach(() => app.close());
});
