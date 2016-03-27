module.exports.GAME_WIDTH = 230
module.exports.GAME_HEIGHT = 130
module.exports.JOIN_GAME_TEXT = "PRESS TO JOIN"
module.exports.JUNK_FREQUENCY_RANGE = { lower: 5, upper: 10}
module.exports.TIME_TO_DESPAWN = 5 * 1000
module.exports.MAX_PLAYERS = 4

module.exports.TRASHBOT = {
    HEALTH: {
        SNAKE: 1,
        TURRET: 1,
        SNIPER: 1,
        TANK: 2
    },
    MOVEMENT: {
        SPEED: 60,
        RAGE_MULTIPLIER: 1.5,
        AMPLITUDE: 15,
        PERIOD: 100
    }
}
module.exports.DIFFICULTY = [
    {
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 5,
            MAX_HEIGHT: 6,
            MAX_WIDTH: 7,
            MAX_WAVES: 2
        },

    }
]
