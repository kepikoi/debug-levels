debug-levels
============

Although [debug-levels](https://www.npmjs.com/package/debug-levels) is not async and thus doesn't need to be promisified, 
I wanted to be able to callback only when a certain debug level applies and decided to use the Promise notion.

## Installation:
```bash
npm install debug-levels-promise
```

## Example Usage:

```javascript
// Using DEBUG=*;DEBUG_LEVEL=debug
const debug = require('debug-levels-promise')('example');

debug('first')
    .then(()=>debug('...second'));

debug
    .log('log!')
    .then(() => debug('...log callback'));

debug.error('error!');

debug.warn('warn!')
    .then(args => debug('...warn callback', args));

debug.debug('debug!'); //debug level threshold

debug
    .info('info!')
    .then(_ => debug('...info callback')); //won't fire

debug.verbose('verbose!');

// debug:example first +0ms
// debug:example log! +1ms
// debug:example error! +0ms
// debug:example warn! +0ms
// debug:example debug! +0ms
// debug:example ...second +1ms
// debug:example ...log callback +0ms
// debug:example ...warn callback { '0': 'warn!' } +0ms
```


## License

(The ISC License)

Copyright (c) 2014, Eugene Song &lt;tilleps@gmail.com&gt;

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

