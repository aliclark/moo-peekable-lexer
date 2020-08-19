
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

class PeekLexer {
    constructor({ lexer, queuedToken, initialized }) {
        this._lexer = lexer
        this._queuedToken = queuedToken || null
        this._initialized = initialized || false
    }

    _initialize() {
        if (!this._initialized) {
            this._queuedToken = this._lexer.next()
            this._initialized = true
        }
    }

    reset(data, info) {
        this._queuedToken = info ? info.queuedToken : null
        this._initialized = info ? !!info.initialized : false
        return this._lexer.reset(data, info && info.lexerInfo)
    }

    save() {
        return {
            queuedToken: this._queuedToken,
            initialized: this._initialized,
            lexerInfo: this._lexer.save()
        }
    }

    setState(state) {
        return this._lexer.setState(state)
    }

    popState() {
        return this._lexer.popState()
    }

    pushState(state) {
        return this._lexer.pushState(state)
    }

    peek() {
        this._initialize()
        return this._queuedToken
    }

    next() {
        this._initialize()
        const token = this._queuedToken
        this._queuedToken = this._lexer.next()
        return token
    }

    [Symbol.iterator]() {
        return new LexerIterator(this)
    }

    formatError(token, message) {
        return this._lexer.formatError(token, message)
    }

    clone() {
        const lexer = this._lexer.clone()
        const queuedToken = this._queuedToken
        const initialized = this._initialized
        return new PeekLexer({ lexer, queuedToken, initialized })
    }

    has(tokenType) {
        return this._lexer.has(tokenType)
    }
}

module.exports = PeekLexer;
