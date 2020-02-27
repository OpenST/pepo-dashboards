import { makeDataFn } from '../../lib/datafn';

// NOTE: RecoveryInitiated event issue
export default makeDataFn(
    {
        queryParameters: {
            earliest: '-24h@h',
            latest: 'now',
        },
        query: 'index=main sourcetype="ethereum:transaction:event" "event.name"=RecoveryInitiated | stats count',
        refresh: 19,
    },
    'ethereum-basics',
    'zp616kzbkous'
);
