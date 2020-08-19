# moo-peek-lexer
## Usage
```js
const moo = require('moo');
const PeekLexer = require('moo-peek-lexer');

const lexer = moo.compile({ ... })
const peekLexer = new PeekLexer({ lexer });

peekLexer.reset('...')

peekLexer.peek()
```