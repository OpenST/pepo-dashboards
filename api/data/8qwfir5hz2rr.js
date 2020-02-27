import { makeDataFn } from '../../lib/datafn';

const baseDebug = require('debug')('datafn');
baseDebug.enabled = true;

const debug = baseDebug.extend("index");
debug.enabled = true;

debug("8qwfir5hz2rr file", "index");

export default makeDataFn(
    {
        queryParameters: {
            earliest: '-24h@h',
            latest: 'now',
        },
        query:
            'index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n| eval from=mvindex(\'event.params{}.value\', 0), to=mvindex(\'event.params{}.value\', 1), value=mvindex(\'event.params{}.value\', 2) \n| stats count by from \n| rename from as users \n| append \n    [ search index=main sourcetype="ethereum:transaction:event" address=0x3FE42c2842377a5F4dc0E521720fb0f0048Baf9A "event.signature"="Transfer(address,address,uint256)" \n    | eval from=mvindex(\'event.params{}.value\', 0), to=mvindex(\'event.params{}.value\', 1), value=mvindex(\'event.params{}.value\', 2) \n    | stats count by to \n    | rename to as users] \n| stats dc(users)',
        refresh: 19,
    },
    'ethereum-basics',
    '8qwfir5hz2rr'
);
