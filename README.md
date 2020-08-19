# moo-peek-lexer
## Usage
```js
const moo = require('moo');
const PeekLexer = require('moo-peek-lexer');

// Create a lexer from rules
const lexer = moo.compile({ ... })
// Create a peek-able lexer using the Moo lexer
const peekLexer = new PeekLexer({ lexer });

// Specify the data
peekLexer.reset('...')

// In addition to the normal Moo methods, peek is available
peekLexer.peek()
peekLexer.next()
```