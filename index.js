
class LexerIterator {
    constructor(lexer) {
        this._lexer = lexer
    }

    next() {
        const token = this._lexer.next()
        return { value: token, done: !token }
    }

    [Symbol.iterator]() {
        return this
    }
}

class PeekableLexer {
    constructor({ mooLexer, queuedToken, initialized }) {
        this._mooLexer = mooLexer
        this._queuedToken = queuedToken || null
        this._initialized = initialized || false
    }

    _initialize() {
        if (!this._initialized) {
            this._queuedToken = this._mooLexer.next()
            this._initialized = true
        }
    }

    reset(data, info) {
        this._queuedToken = info ? info.queuedToken : null
        this._initialized = info ? !!info.initialized : false
        return this._mooLexer.reset(data, info && info.mooLexerInfo)
    }

    save() {
        return {
            queuedToken: this._queuedToken,
            initialized: this._initialized,
            mooLexerInfo: this._mooLexer.save()
        }
    }

    setState(state) {
        return this._mooLexer.setState(state)
    }

    popState() {
        return this._mooLexer.popState()
    }

    pushState(state) {
        return this._mooLexer.pushState(state)
    }

    peek() {
        this._initialize()
        return this._queuedToken
    }

    next() {
        this._initialize()
        const token = this._queuedToken
        this._queuedToken = this._mooLexer.next()
        return token
    }

    [Symbol.iterator]() {
        return new LexerIterator(this)
    }

    formatError(token, message) {
        return this._mooLexer.formatError(token, message)
    }

    clone() {
        const mooLexer = this._mooLexer.clone()
        const queuedToken = this._queuedToken
        const initialized = this._initialized
        return new PeekableLexer({ mooLexer, queuedToken, initialized })
    }

    has(tokenType) {
        return this._mooLexer.has(tokenType)
    }
}

module.exports = PeekableLexer;
