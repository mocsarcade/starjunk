var raf = require("raf")

var Loop = function(func) {
    return (function loop(tick) {
        tick = (Date.now() - tick) / 1000
        tick = Math.min(tick, 1000)
        func(tick)
        raf(loop.bind(this, Date.now()))
    })(Date.now())
}

module.exports = Loop
