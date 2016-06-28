import Trashbot from "scripts/sprites/Trashbot.js"
import Reference from "scripts/data/Reference.js"
import Projectile from "scripts/sprites/Projectile.js"

export default class SnakeTrashbot extends Trashbot {
    constructor(position, movementStyle) {
        super(
            position,
            Reference.TRASHBOT.MOVEMENT.SPEED,
            Reference.TRASHBOT.HEALTH.SNAKE,
            PIXI.loader.resources.snakeTrashbot.texture
        )
        this.movement = (movementStyle === undefined) ? Trashbot.MovementStrategy.SINUSOIDAL : movementStyle
    }

    update(delta) {
        this.movement(this, Reference.TRASHBOT.MOVEMENT.PERIOD, Reference.TRASHBOT.MOVEMENT.AMPLITUDE)
        super.update(delta)
    }

    respawn() {
        super.respawn(this.INITIAL.y)
    }
}
