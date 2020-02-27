import { makeDataFn } from '../../lib/datafn';

export default makeDataFn(
    {
        query:
            'index=main sourcetype="ethereum:transaction*" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval event.args.owner=mvindex(\'event.params{}.value\', 0), event.args.spender=mvindex(\'event.params{}.value\', 1), event.args.value=mvindex(\'event.params{}.value\', 2) \n| table transactionHash event.args.* \n| rename event.args.* as * \n| eval value = value / pow(10, 18) \n| stats sum(value) as total dc(transactionHash) as num_transactions \n| eval transaction_fee=(total*0.015*.01)+(num_transactions*0.029) | fields transaction_fee',
        refresh: 13,
        queryParameters: {
            earliest: '2020-02-08T00:00:00.000',
            latest: 'now',
        },
    },
    'ethereum-basics',
    'gaqgzpprpdme'
);
