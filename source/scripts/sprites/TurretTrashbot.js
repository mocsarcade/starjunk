var Victor = require("victor")
import Trashbot from "scripts/sprites/Trashbot.js"
import Reference from "scripts/data/Reference.js"
import Projectile from "scripts/sprites/Projectile.js"
import Utility from "scripts/data/Utility.js"

export default class TurretTrashbot extends Trashbot {
    constructor(position, shootStyle) {
        super(
            position,
            Reference.TRASHBOT.MOVEMENT.SPEED,
            Reference.TRASHBOT.HEALTH.TURRET,
            PIXI.loader.resources.turretTrashbot.texture)
        this.movement = Trashbot.MovementStrategy.MOVE_TO_POSITION
        this.shoot = (shootStyle === undefined) ? Trashbot.ShootStrategy.INTERVAL : shootStyle
        this.bullets = Utility.randomNumber(1,2)
        this.bulletSpeed = 1.8
    }

    update(delta) {
        this.movement(this, Reference.TRASHBOT.MOVEMENT.PERIOD, Reference.TRASHBOT.MOVEMENT.AMPLITUDE)
        this.shoot(this, Reference.TRASHBOT.MOVEMENT.PERIOD)
        super.update(delta)
    }

    fire(target) {
        if (target && Projectile.EnemyInventory.length < Reference.MAX_ENEMY_PROJECTILES) {
            var vector = new Victor(target.position.x - this.position.x, target.position.y - this.position.y)
            var bulletDistance = 6
            vector.normalize()
            for (var bulletIndex = 0; bulletIndex < this.bullets; bulletIndex++) {
                game.addChild(new Projectile(
                    this.position.x + bulletDistance*bulletIndex*vector.x,
                    this.position.y + this.height/2 + bulletDistance*bulletIndex*vector.y,
                    vector, this, this.bulletSpeed, "bullet", false))
            }
        }
    }
}
