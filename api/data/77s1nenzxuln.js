import { makeDataFn } from '../../lib/datafn';

// NOTE: No new data issue
export default makeDataFn(
    {
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval event.args.from=mvindex(\'event.params{}.value\', 0), event.args.to=mvindex(\'event.params{}.value\', 1), event.args.value=mvindex(\'event.params{}.value\', 2) \n| table _time event.args.* \n| rename event.args.* as * \n| eval value = value / pow(10, 18) | sort - _time \n| search value>1\n|  head 5',
        refresh: 11,
        queryParameters: {
            earliest: '-15m',
            latest: 'now',
        },
    },
    'ethereum-basics',
    '77s1nenzxuln'
);
