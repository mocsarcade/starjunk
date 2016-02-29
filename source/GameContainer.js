var Pixi = require("pixi.js")
var Keyb = require("keyb")

import Junkership from "./Junkership.js"
import Trashbot from "./Trashbot.js"
import SnakeTrashbot from "./SnakeTrashbot.js"
import TankTrashbot from "./TankTrashbot.js"
import SniperTrashbot from "./SniperTrashbot.js"
import TurretTrashbot from "./TurretTrashbot.js"
import Reference from "./Reference.js"
import Textures from "./Textures.js"
import Junk from "./Junk.js"
import Utility from "./Utility.js"

export default class GameContainer extends Pixi.Container {
    constructor() {
        super()
        this.playerCount = 0
        this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
        this.spawnWaveInterval = 0
        this.difficulty = Reference.DIFFICULTY[0]
        Textures.initTex()
    }

    gameOver() {
        // TODO High score and stat reporting logic
    }

    spawnWave() {
        this.addChild(new SnakeTrashbot(new Pixi.Point(Reference.GAME_WIDTH, Reference.GAME_HEIGHT * 1/5), Trashbot.MovementStrategy.SINUSOIDAL))
        this.addChild(new TankTrashbot(new Pixi.Point(Reference.GAME_WIDTH, Reference.GAME_HEIGHT * 2/5), Trashbot.MovementStrategy.LINEAR))
        this.addChild(new SniperTrashbot(new Pixi.Point(Reference.GAME_WIDTH, Reference.GAME_HEIGHT * 3/5), Trashbot.MovementStrategy.MOVE_STOP,
            SniperTrashbot.ShootStrategy.INTERVAL))
        this.addChild(new TurretTrashbot(new Pixi.Point(Reference.GAME_WIDTH, Reference.GAME_HEIGHT * 4/5), Trashbot.ShootStrategy.RANDOM))
    }

    untilJunk(x, y) {
        if (this.countdownToJunk == 0) {
            this.countdownToJunk = Utility.randomNumber(Reference.JUNK_FREQUENCY_RANGE.lower, Reference.JUNK_FREQUENCY_RANGE.upper)
            this.addChild(new Junk(x, y))
        } else this.countdownToJunk--
    }

    checkPlayerSpawn() {
        for (var i = 0; i < Reference.controlTypeCount; i++) {
            if (!Reference.ControlScheme.keys[i].inUse && (
                Keyb.isDown(Reference.ControlScheme.keys[i].up) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].down) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].left) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].right) ||
                Keyb.isDown(Reference.ControlScheme.keys[i].fire))) {
                Reference.ControlScheme.keys[i].inUse = true

                game.addChild(new Junkership(i))
            }
        }
    }
}
