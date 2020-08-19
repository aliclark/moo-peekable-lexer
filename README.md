# moo-peekable-lexer
## Usage
```js
const moo = require('moo');
const PeekableLexer = require('moo-peekable-lexer');

// Create a mooLexer from rules
const mooLexer = moo.compile({ ... })
// Create a peekable lexer using the Moo lexer
const peekableLexer = new PeekableLexer({ mooLexer });

// Specify the data
peekableLexer.reset('...')

// In addition to the normal Moo methods, peek is available
peekableLexer.peek()
peekableLexer.next()
```
