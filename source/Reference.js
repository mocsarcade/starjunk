module.exports.GAME_WIDTH = 230
module.exports.GAME_HEIGHT = 130
module.exports.JOIN_GAME_TEXT = "PRESS TO JOIN"
module.exports.JUNK_FREQUENCY_RANGE = { lower: 5, upper: 10}
module.exports.TIME_TO_DESPAWN = 5 * 1000
module.exports.MAX_PLAYERS = 4

module.exports.ControlScheme = {
    WASD: 0,
    NUM_PAD: 1,
    ARROW_KEYS: 2,
    keys: {
        0: {up: "W", down: "S", left: "A", right: "D", fire: "<space>", inUse: false},
        1: {up: "<num-8>", down: "<num-2>", left: "<num-4>", right: "<num-6>", fire: "<num-0>", inUse: false},
        2: {up: "<up>", down: "<down>", left: "<left>", right: "<right>", fire: ".", inUse: false}
    }
}
module.exports.controlTypeCount = Object.keys(module.exports.ControlScheme).length -1
