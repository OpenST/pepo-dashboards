import { makeDataFn } from '../../lib/datafn';

// NOTE: setup issue
export default makeDataFn(
    {
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval from=mvindex(\'event.params{}.value\', 0), to=mvindex(\'event.params{}.value\', 1), value=mvindex(\'event.params{}.value\', 2) \n| table transactionHash from to value \n| eval value = value / pow(10, 18) \n| stats sum(value) as totalValue by from \n| sort - totalValue \n| lookup pepo_users tokenholder_address as from\n| search name != RESERVE NOT name="The Pepo App" NOT name="Pepo App" NOT name="Anunaki Sciences"\n| head 10\n | table name totalValue',
        queryParameters: {
            earliest: '-24h@h',
            latest: 'now',
        },
        refresh: 60,
    },
    'ethereum-basics',
    'e2acc1xs2njj'
);
