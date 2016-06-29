var Pixi = require("pixi.js")
import Reference from "scripts/data/Reference.js"
import Junkership from "scripts/sprites/Junkership.js"
import Utility from "scripts/data/Utility.js"
import Trashbot from "scripts/sprites/Trashbot.js"
import SnakeTrashbot from "scripts/sprites/SnakeTrashbot.js"
import TankTrashbot from "scripts/sprites/TankTrashbot.js"
import SniperTrashbot from "scripts/sprites/SniperTrashbot.js"
import TurretTrashbot from "scripts/sprites/TurretTrashbot.js"
var Move = Trashbot.MovementStrategy
var Shoot = Trashbot.ShootStrategy


export default class SpawnWave {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.currentColumn = 0
        this.transition = 0
        this.emptyMatrix()
        this.randomWave()
        this.TRANSITION_LAPSE = 0.5
    }

    update(delta) {
        this.transition += delta
        if (this.currentColumn < this.width && this.transition >= this.TRANSITION_LAPSE) {
            this.displayNextColumn(this.currentColumn)
            this.currentColumn++
            this.transition = 0
        }

        var column, row, empty = true
        for (column = 0; column < this.width; column++) {
            for (row = 0; row < this.height; row++) {
                if (this.matrix[row][column] && "position" in this.matrix[row][column]) {
                    empty = false
                }
            }
        }
        if (empty) {
            game.waves.splice(game.waves.indexOf(this), 1)
        }
    }

    emptyMatrix() {
        this.matrix = []
        for (var i = 0; i < this.height; i++) {
            this.matrix[i] = new Array(this.width)
        }
    }

    fillMatrix() {
        var column, row
        for (column = 0; column < this.width; column++) {
            for (row = 0; row < this.height; row++) {
                if (this.matrix[row][column] === undefined) {
                    this.addPattern({x: column, y: row})
                }
            }
        }
    }

    randomWave() {
        for (var i = 0; i < game.difficulty.SPAWN_WAVE.PATTERNS_PER_WAVE; i++) {
            var column = Math.floor(Utility.randomNumber(0, this.width) / 2)
            var row = Utility.randomNumber(0, this.height)
            this.addPattern({x: column, y: row})
        }

    }

    displayNextColumn(column) {
        if (Junkership.Inventory.length > 0) {
            var row
            for (row = 0; row < this.matrix.length; row++) {
                if (this.matrix[row][column]) {
                    game.addChild(this.matrix[row][column])
                }
            }
        }
    }

    addPattern(position) {
        var random = Utility.randomNumber(0, SpawnWave.Patterns.length - 1)

        var pattern = SpawnWave.Patterns[random]
        var column, row
        for (column = 0; column < pattern[0].length && column + position.x < this.width; column++) {
            for (row = 0; row < pattern.length && row + position.y < this.height; row++) {
                var screenPosition = new Pixi.Point(Reference.GAME_WIDTH, Reference.GAME_HEIGHT * (row + position.y + 1) / (this.height + 1))
                var cell = pattern[row][column]
                if (cell.type === null) {
                    this.matrix[row + position.y][column + position.x] = null
                } else if (cell.type === "Snake") {
                    this.matrix[row + position.y][column + position.x] = new SnakeTrashbot(screenPosition, cell.movement)
                } else if (cell.type === "Tank") {
                    this.matrix[row + position.y][column + position.x] = new TankTrashbot(screenPosition, cell.movement)
                } else if (cell.type === "Sniper") {
                    this.matrix[row + position.y][column + position.x] = new SniperTrashbot(screenPosition, cell.movement, cell.shoot)
                } else if (cell.type === "Turret") {
                    this.matrix[row + position.y][column + position.x] = new TurretTrashbot(screenPosition, cell.shoot)
                }
            }
        }

    }
}

SpawnWave.Patterns = [
    [
        [{type: "Snake"}, {type: "Snake"}, {type: "Snake"}]
    ],
    [
        [{type: "Snake"}, {type: "Snake"}, {type: "Snake"}, {type: "Snake"}, {type: "Snake"}]
    ],
    [
        [{type: "Snake"}, {type: "Snake"}, {type: "Snake"}],
        [{type: "Snake"}, {type: "Snake"}, {type: "Snake"}]
    ],
    [
        [{type: "Turret"}],
        [{type: null}],
        [{type: null}],
        [{type: "Turret"}]
    ],
    [
        [{type: "Sniper"}],
        [{type: "Sniper"}]
    ],
    [
        [{type: "Tank"}],
        [{type: null}],
        [{type: "Tank"}]
    ],
    [
        [{type: "Tank"}]
    ]
]