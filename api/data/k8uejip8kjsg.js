import { makeDataFn } from '../../lib/datafn';

// NOTE: No new data issue
export default makeDataFn(
    {
        query: 'index=main sourcetype=ethereum:transaction* \n| timechart count by event.name limit=10 usenull=f',
        refresh: 36,
        queryParameters: {
            earliest: '-60m@m',
            latest: 'now',
        },
    },
    'ethereum-basics',
    'k8uejip8kjsg'
);
