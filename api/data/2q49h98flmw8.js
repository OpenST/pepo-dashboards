import { makeDataFn } from '../../lib/datafn';

export default makeDataFn(
    {
        queryParameters: {
            earliest: '-24h@h',
            latest: 'now',
        },
        query: 'index=main\n| timechart span=5m count',
        refresh: 60,
    },
    'ethereum-basics',
    '2q49h98flmw8'
);
