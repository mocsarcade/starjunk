var Pixi = require("pixi.js")
var Reference = require("scripts/data/Reference.js")
var Victor = require("victor")

import Explosion from "scripts/sprites/Explosion.js"
import Particle from "scripts/sprites/Particle.js"

export default class Projectile extends Pixi.Sprite {
    constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
        super()
        this.x = x
        this.y = y
        this.vector = vector
        this.bulletSpeed = bulletSpeed
        this.shotBy = shotBy
        this.projectileType = projectileType
        this.friendly = (friendly === undefined) ? true : friendly
        if (this.friendly) {
            Projectile.FriendlyInventory.push(this)
            this.texture = PIXI.loader.resources.projectile.texture
        } else {
            Projectile.EnemyInventory.push(this)
            this.texture = PIXI.loader.resources.enemyProjectile.texture
        }
    }

    update(delta) {
        this.position.x += this.vector.x * this.bulletSpeed
        this.position.y += this.vector.y * this.bulletSpeed

        if (this.position.x < 0 || this.position.x > Reference.GAME_WIDTH ||
            this.position.y < 0 || this.position.y > Reference.GAME_HEIGHT) {
            this.destroy()
        }
    }

    onCollision(collidedWith) {
        if(this.piercing != true) {
            this.destroy()
        }
    }

    destroy() {
        game.removeChild(this)
        var index = -1
        if (this.friendly) {
            index = Projectile.FriendlyInventory.indexOf(this)
            Projectile.FriendlyInventory.splice(index, 1)
        } else {
            index = Projectile.EnemyInventory.indexOf(this)
            Projectile.EnemyInventory.splice(index, 1)
        }
        if (index >= 0) {
            super.destroy()
        }
    }
}

export class MineProjectile extends Projectile {
    constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
        super(x, y, vector, shotBy, bulletSpeed, projectileType, friendly)
        this.texture = PIXI.loader.resources.projectile.texture
    }

    update(delta) {
        super.update(delta)
        this.rotation += 1
    }

    onCollision(collidedWith) {
        if(this.projectileType == "mine") {
            new Explosion().explodeEnemy(this)
        } else if(this.projectileType == "superMine") {
            new Explosion().explodePlayer(this)
        }
        var curMine = this.shotBy.powerUp.mines.indexOf(this)
        delete this.shotBy.powerUp.mines[curMine]
        this.destroy()
    }
}

export class SineProjectile extends Projectile {
    constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
        super(x, y, vector, shotBy, bulletSpeed, projectileType, friendly)
        this.t = 0
    }

    update(delta) {
        this.t += delta
        var coefficient = 2 * Math.PI * Reference.SINE_PROJECTILES.FREQUENCY
        var m = Reference.SINE_PROJECTILES.AMPLITUDE * coefficient * Math.cos(coefficient * this.t)
        if (this.projectileType === "sinedown") {
            m = -m
        }
        var vector = Victor(1, m)
        vector.normalize()
        this.vector = vector
    }
}

export class PaintProjectile extends Projectile {
    update(delta) {
        super.update(delta)
        this.rotation += 1
        this.scale.x = Math.random() * 3
        this.scale.y = Math.random() * 3
        this.vector.y += .05
    }
}

export class SwordProjectile extends Projectile {
    constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
        super(x, y, vector, shotBy, bulletSpeed, projectileType, friendly)
        this.texture = PIXI.loader.resources.plaser.texture
        this.scale.x = 2
        this.piercing = true
    }

    update(delta) {
        this.position.x = this.shotBy.x + this.shotBy.width
        this.position.y = this.shotBy.y + this.shotBy.height / 2
    }
}

export class LaserProjectile extends Projectile {
    constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
        super(x, y, vector, shotBy, bulletSpeed, projectileType, friendly)
        if(this.projectileType == "laser") {
            this.texture = PIXI.loader.resources.laser.texture
        } else if(this.projectileType == "piercinglaser") {
            this.piercing = true
            this.texture = PIXI.loader.resources.plaser.texture
        } else if(this.projectileType == "superlaser") {
            this.piercing = true
            this.despawn = true
            this.spawnTime = Date.now()
            this.texture = PIXI.loader.resources.slaser.texture
        }
    }

    update(delta) {
        super.update(delta)
        if (this.despawn == true) {
            this.scale.y += .05
            this.position.y += .1
            if (Date.now() - this.spawnTime >= Reference.SUPER_DESPAWN * 1000) {
                this.destroy()
            }
        }
    }
}

Projectile.FriendlyInventory = []
Projectile.EnemyInventory = []
