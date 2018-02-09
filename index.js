const
    debug = require('debug')
    , assert = require('assert')
    , logLevel = process.env.DEBUG_LEVEL || 'verbose'
    , logLevels = [
        'log',
        'error',
        'warn',
        'debug',
        'info',
        'verbose'
    ]
;
// check supported levels
assert.ok(logLevels.some(l => l === logLevel), `DEBUG_LEVEL ${logLevel} not allowed. Use one of these for process.env.DEBUG_LEVEL: ${logLevels.join(', ')}`);

//  create a list of allowed levels
const allowedLevels = logLevels.slice(0, logLevels.indexOf(logLevel) + 1);

/**
 * create Debug-level supported debug
 * @param {String} namespace - debugging namespace for debug module
 */
module.exports = namespace => {
    //basic debug() call
    const callDebug = function () {
        //sync call
        debug(namespace).apply(null, arguments);
        // return thenable promise
        return Promise.resolve(arguments);
    };
    //leveled debug call e.g. debug.warn() etc
    logLevels.map(level => {
        const isAllowed = ~allowedLevels.indexOf(level);
        callDebug[level] = isAllowed ?
            function(){ return callDebug.apply(null, arguments) } :
            () => ({
                //Promise mock. Callback won't be fired
                then() {
                    return null
                }
            })
        ;
    });

    return callDebug;
};

module.exports.levels = logLevels;