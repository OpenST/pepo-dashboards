import React from 'react';
import Dashboard from '../../dashboard';
import definition from './definition.json';

const baseDebug = require('debug')('datafn');
baseDebug.enabled = true;

const debug = baseDebug.extend("index");
debug.enabled = true;

debug("hello", "index");

export default function() {
    return <Dashboard definition={definition} />;
}
