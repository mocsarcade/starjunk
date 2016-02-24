import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"

export default class TankTrashbot extends Trashbot {
    constructor(position, movementStyle) {
        super(
            position,
            Reference.TRASHBOT.MOVEMENT.SPEED,
            Reference.TRASHBOT.HEALTH.TANK,
            PIXI.loader.resources.tankTrashbot.texture)
        this.movement = movementStyle
    }

    update(delta) {
        this.movement(this, Reference.TRASHBOT.MOVEMENT.AMPLITUDE, Reference.TRASHBOT.MOVEMENT.PERIOD)


        super.update(delta)
    }
}