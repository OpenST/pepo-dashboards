import { makeDataFn } from '../../lib/datafn';

export default makeDataFn(
    {
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)"index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval event.args.owner=mvindex(\'event.params{}.value\', 0), event.args.spender=mvindex(\'event.params{}.value\', 1), event.args.value=mvindex(\'event.params{}.value\', 2) \n| stats count | eval costSaved=round((count*.01),2) \n|  table costSaved',
        refresh: 13,
        queryParameters: {
            earliest: '2020-02-08T00:00:00.000',
            latest: 'now',
        },
    },
    'ethereum-basics',
    'u3gsls6khrqo'
);
