import { makeDataFn } from '../../lib/datafn';

// NOTE: setup issue
export default makeDataFn(
    {
        queryParameters: {
            earliest: '-10m',
            latest: 'now',
        },
        query: `index=* sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" 
        | eval event.args.from=mvindex('event.params{}.value', 0), event.args.to=mvindex('event.params{}.value', 1), event.args.value=mvindex('event.params{}.value', 2) 
        | table transactionHash event.args.* 
        | rename event.args.* as * 
        | eval value = value / pow(10, 18)
        | eval address = split(to + "," + from, ",")
        | mvexpand address
        | eval sent = if(address == from, value, 0)
        | eval received = if(address == to, value, 0)
        | stats sum(received) as received sum(sent) as sent by address
        | lookup pepo_users tokenholder_address as address
        | sort -received
        | search name=* NOT name="The Pepo App"
        | head 1`,
        //'index=* sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval event.args.from=mvindex(\'event.params{}.value\', 0), event.args.to=mvindex(\'event.params{}.value\', 1), event.args.value=mvindex(\'event.params{}.value\', 2) \n| table transactionHash event.args.* \n| rename event.args.* as * \n| eval value = value / pow(10, 18)\n| stats sum(value) as received by to\n| lookup pepo_users tokenholder_address as to\n| sort -received\n| search name=* NOT name="The Pepo App"\n| head 1',
        refresh: 30,
    },
    'ethereum-basics',
    'bdv7spkbb50f'
);
