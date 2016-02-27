module.exports.GAME_WIDTH = 230
module.exports.GAME_HEIGHT = 130
module.exports.JOIN_GAME_TEXT = "PRESS TO JOIN"
module.exports.JUNK_FREQUENCY_RANGE = { lower: 5, upper: 10}
module.exports.TIME_TO_DESPAWN = 5 * 1000

module.exports.ControlScheme = {
    WASD: 0,
    NUM_PAD: 1,
    ARROWS: 2,
    keys: {
        0: {up: "W", down: "S", left: "A", right: "D", fire: "<space>"},
        1: {up: "8", down: "2", left: "4", right: "6", fire: "0"},
        2: {up: "<up>", down: "<down>", left: "<left>", right: "<right>", fire: "<space>"}
    }
}
