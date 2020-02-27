import { makeDataFn } from '../../lib/datafn';

export default makeDataFn(
    {
        queryParameters: {
            earliest: '-30d@d',
            latest: 'now',
        },
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="InternalActorRegistered(address)" \n| timechart count',
        refresh: 219,
    },
    'ethereum-basics',
    'ryijcrrbx7yf'
);
