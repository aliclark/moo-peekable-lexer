const moo = require('moo');
const PeekableLexer = require('./');

describe('PeekableLexer', () => {

    it('runs on Moo example input', () => {
        const mooLexer = moo.compile({
            WS:      /[ \t]+/,
            comment: /\/\/.*?$/,
            number:  /0|[1-9][0-9]*/,
            string:  /"(?:\\["\\]|[^\n"\\])*"/,
            lparen:  '(',
            rparen:  ')',
            keyword: ['while', 'if', 'else', 'moo', 'cows'],
            NL:      { match: /\n/, lineBreaks: true },
        })
        const peekableLexer = new PeekableLexer({ mooLexer });

        peekableLexer.reset('while (10) cows\nmoo')

        expect(peekableLexer.next().text).toBe('while');
        expect(peekableLexer.peek().text).toBe(' ');
        expect(peekableLexer.next().text).toBe(' ');
        expect(peekableLexer.next().text).toBe('(');
        expect(peekableLexer.next().text).toBe('10');
        expect(peekableLexer.next().text).toBe(')');
        expect(peekableLexer.next().text).toBe(' ');
        expect(peekableLexer.next().text).toBe('cows');
        expect(peekableLexer.next().text).toBe('\n');
        expect(peekableLexer.peek().text).toBe('moo');
        expect(peekableLexer.next().text).toBe('moo');
        expect(peekableLexer.peek()).toBe(undefined);
        expect(peekableLexer.next()).toBe(undefined);
        expect(peekableLexer.peek()).toBe(undefined);
        expect(peekableLexer.next()).toBe(undefined);
    });
})