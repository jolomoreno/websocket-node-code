import { Test } from '@nestjs/testing';
import { ChargerGateway } from '../src/events/charger/charger.gateway';
import {INestApplication} from '@nestjs/common';
import * as io from 'socket.io-client';
import {Message} from '../src/events/message';

async function createNestApp(...gateways): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
        providers: gateways,
    }).compile();
    return await testingModule.createNestApplication();
}

describe('[CHARGER] E2E Test', () => {
    const messageCharging: Message = {
        event: 'chargingStatus',
        data: {
            status: 'charging',
        },
    };

    let ws;
    let app;

    it(`- Connect, emit status and receive status from Server -`, async () => {
        app = await createNestApp(ChargerGateway);
        await app.listenAsync(3000);

        ws = io.connect('ws://localhost:3100/chargers/c1234');
        ws.emit('charger', messageCharging);
        await new Promise(resolve =>
            ws.on('charger', (charger) => {
                expect(charger.event).toEqual('chargingStatus');
                expect(charger.data.status).toEqual('charging');
                resolve();
            }),
        );
        ws.close();
    });
    afterEach(() => app.close());
});
