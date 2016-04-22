module.exports.GAME_WIDTH = 400
module.exports.GAME_HEIGHT = 225
module.exports.JOIN_GAME_TEXT = "PRESS TO JOIN"
module.exports.INITIALS_ENTRY_TEXT = "HIGH SCORE"
module.exports.TIME_TO_DESPAWN = 7.5 * 1000
module.exports.SUPER_DESPAWN = .5 * 1000
module.exports.MINE_DESPAWN - .5 * 1000
module.exports.SHORT_COOLDOWN = 50
module.exports.LONG_COOLDOWN = 100
module.exports.MAX_PLAYERS = 4
module.exports.MAX_ENEMY_PROJECTILES = 25
module.exports.NORMAL_BULLET_SPEED = 2
module.exports.NORMAL_LASER_SPEED = 5000
module.exports.FAST_BULLET_SPEED = 3.5
module.exports.BG_VOLUME = 1
module.exports.STAR_COUNT = 50
module.exports.STAR_COLORS = [0xFFFF00, 0x00FFFF, 0x7FFF00] // Yellow Blue Green
module.exports.TIME_TO_STREAK = {
    lower: 7000,
    upper: 20000
}

module.exports.FIREBASE_URL = "http://mocsarcade.firebaseio.com/starjunk"
module.exports.HIGH_SCORE_NAME_VALUES = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"


module.exports.TRASHBOT = {
    HEALTH: {
        SNAKE: 1,
        TURRET: 2,
        SNIPER: 1,
        TANK: 4
    },
    MOVEMENT: {
        SPEED: 80,
        RAGE_MULTIPLIER: 1.75,
        AMPLITUDE: 15,
        PERIOD: 150
    }
}
module.exports.DIFFICULTY = [
    {
        LEVEL: 0,
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 1,
            MAX_HEIGHT: 8,
            MAX_WIDTH: 8,
            MAX_WAVES: 6,
            PATTERNS_PER_WAVE: 1
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 4,
            upper: 6
        },
        SCORE_LIMIT: 3
    },
    {
        LEVEL: 1,
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 1,
            MAX_HEIGHT: 8,
            MAX_WIDTH: 8,
            MAX_WAVES: 10,
            PATTERNS_PER_WAVE: 1
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 4,
            upper: 6
        },
        SCORE_LIMIT: 10
    },
    {
        LEVEL: 2,
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 1,
            MAX_HEIGHT: 10,
            MAX_WIDTH: 8,
            MAX_WAVES: 12,
            PATTERNS_PER_WAVE: 1
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 4,
            upper: 5
        },
        SCORE_LIMIT: 20
    },
    {
        LEVEL: 3,
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 1,
            MAX_HEIGHT: 10,
            MAX_WIDTH: 8,
            MAX_WAVES: 8,
            PATTERNS_PER_WAVE: 2
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 4,
            upper: 5
        },
        SCORE_LIMIT: 30
    },
    {
        LEVEL: 3,
        HEALTH_MULTIPLIER: 1,
        SPAWN_WAVE: {
            INTERVAL: 1,
            MAX_HEIGHT: 10,
            MAX_WIDTH: 8,
            MAX_WAVES: 10,
            PATTERNS_PER_WAVE: 2
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 3,
            upper: 5
        },
        SCORE_LIMIT: 100
    },
    {
        LEVEL: 4,
        HEALTH_MULTIPLIER: 1.5,
        SPAWN_WAVE: {
            INTERVAL: 0.75,
            MAX_HEIGHT: 10,
            MAX_WIDTH: 8,
            MAX_WAVES: 20,
            PATTERNS_PER_WAVE: 3
        },
        JUNK_FREQUENCY_RANGE: {
            lower: 3,
            upper: 5
        },
        SCORE_LIMIT: 1000000
    }
]
