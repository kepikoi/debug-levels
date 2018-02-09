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
 * Create Debug-level supported debug
 *
 * @param {String} namespace
 * @return {Object}
 */
module.exports = namespace => {
    //basic debug() call
    const callDebug = function () {
        debug(namespace).apply(null, arguments)
    };
    //leveled debug call e.g. debug.warn() etc
    logLevels.map(level => {
        const isAllowed = ~allowedLevels.indexOf(level);
        callDebug[level] = isAllowed ?
            function () {
                //call debug
                callDebug.apply(null, arguments);
                // return promise
                return Promise.resolve(arguments)
            } :
            () => ({
                //Promise mock
                then() {
                    return null
                }
            })
        ;
    });

    return callDebug;
};


//  Export available levels
module.exports.levels = logLevels;
