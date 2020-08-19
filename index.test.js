const moo = require('moo');
const PeekLexer = require('./');

describe('PeekLexer', () => {

    it('runs on example input', () => {
        const lexer = moo.compile({
            WS:      /[ \t]+/,
            comment: /\/\/.*?$/,
            number:  /0|[1-9][0-9]*/,
            string:  /"(?:\\["\\]|[^\n"\\])*"/,
            lparen:  '(',
            rparen:  ')',
            keyword: ['while', 'if', 'else', 'moo', 'cows'],
            NL:      { match: /\n/, lineBreaks: true },
        })
        const peekLexer = new PeekLexer({ lexer });

        peekLexer.reset('while (10) cows\nmoo')

        expect(peekLexer.next().text).toBe('while');
        expect(peekLexer.peek().text).toBe(' ');
        expect(peekLexer.next().text).toBe(' ');
        expect(peekLexer.next().text).toBe('(');
        expect(peekLexer.next().text).toBe('10');
        expect(peekLexer.next().text).toBe(')');
        expect(peekLexer.next().text).toBe(' ');
        expect(peekLexer.next().text).toBe('cows');
        expect(peekLexer.next().text).toBe('\n');
        expect(peekLexer.peek().text).toBe('moo');
        expect(peekLexer.next().text).toBe('moo');
        expect(peekLexer.peek()).toBe(undefined);
        expect(peekLexer.next()).toBe(undefined);
        expect(peekLexer.peek()).toBe(undefined);
        expect(peekLexer.next()).toBe(undefined);
    });
})