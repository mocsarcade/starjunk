import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"

export default class SnakeTrashbot extends Trashbot {
    constructor(position, movementStyle) {
        super(
            position,
            Reference.TRASHBOT.MOVEMENT.SPEED,
            Reference.TRASHBOT.HEALTH.SNAKE,
            PIXI.loader.resources.snakeTrashbot.texture
        )
        this.movement = movementStyle
    }

    update(delta) {
        this.movement(this, Reference.TRASHBOT.MOVEMENT.PERIOD, Reference.TRASHBOT.MOVEMENT.AMPLITUDE)


        super.update(delta)
    }
}