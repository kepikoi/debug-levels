/**
* DEBUG=* node example/index.js
* DEBUG=* DEBUG_LEVEL=error node example/index.js
*/
const levels = require('..').levels;
const debug = require('..')('debug:example');

debug('first')
    .then(()=>debug('...second'));

debug
    .log('log!')
    .then(_ => debug('...log callback'));
debug.error('error!');
debug.warn('warn!')
    .then(args => debug('...warn callback', args));
debug.debug('debug!');
debug
    .info('info!')
    .then(_ => debug('...info callback'));
debug.verbose('verbose!');


//  Display list of available levels
// console.log('debug levels:', levels);