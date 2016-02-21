import Trashbot from "./Trashbot.js"
import Reference from "./Reference.js"
import Projectile from "./Projectile.js"
import Junkership from "./Junkership.js"
import Junk from "./Junk.js"

export default class SnakeTrashbot extends Trashbot {
    constructor(x, y, movementStyle) {
        super(x, y, Reference.TRASHBOT.MOVEMENT.SPEED, Reference.TRASHBOT.HEALTH.SNAKE)
        this.movement = movementStyle
    }

    update(delta) {
        this.movement(this, delta, Reference.TRASHBOT.MOVEMENT.AMPLITUDE, Reference.TRASHBOT.MOVEMENT.PERIOD)


        if (this.position.x + this.width < 0) {
            this.position.x = Reference.GAME_WIDTH
        }
        super.update()
    }
}