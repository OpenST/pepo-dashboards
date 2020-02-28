import { makeDataFn } from '../../lib/datafn';

// NOTE: setup issue
export default makeDataFn(
    {
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval from=mvindex(\'event.params{}.value\', 0), to=mvindex(\'event.params{}.value\', 1), value=mvindex(\'event.params{}.value\', 2) \n| table transactionHash from to value \n| eval value = value / pow(10, 18) \n| stats sum(value) as totalValue by to \n| sort - totalValue \n| lookup pepo_users tokenholder_address as to\n| search name != RESERVE NOT name="The Pepo App" NOT name="Pepo App" NOT name="Anunaki Sciences"\n| head 10 | table name totalValue\n',
        queryParameters: {
            earliest: '2020-02-28T00:00:00.000',
            latest: 'now',
        },
        refresh: 60,
    },
    'ethereum-basics',
    'jbgc68hybe0b'
);
