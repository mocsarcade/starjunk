var Pixi = require("pixi.js")
var Reference = require("Reference.js")
var Victor = require("victor")

import Explosion from "./Explosion.js"
import Particle from "./Particle.js"

export default class Projectile extends Pixi.Sprite {

  constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
      super()
      this.x = x
      this.y = y
      this.vector = vector
      this.bulletSpeed = bulletSpeed
      this.shotBy = shotBy
      this.timer = 0
      this.projectileType = projectileType
      this.onHit = new Explosion()
      this.friendly = (friendly === undefined) ? true : friendly
      if (this.friendly) {
          Projectile.FriendlyInventory.push(this)
          if(this.projectileType == "bullet" || this.projectileType == "mine" || this.projectileType == "superMine"
              || this.projectileType == "paintShot" || this.projectileType == "sineBullet") {
              this.texture = PIXI.loader.resources.projectile.texture

              if(this.projectileType == "mine" || this.projectileType == "superMine") {
                  shotBy.mineArray.push(this)
                  if(shotBy.mineArray.length > Reference.MAX_MINES) {
                      var mine = shotBy.mineArray.shift()
                      if(mine != null) {
                          mine.destroy()
                      }

                  }
              }
          } else if(this.projectileType == "laser") {
              this.texture = PIXI.loader.resources.laser.texture
          } else if(this.projectileType == "piercinglaser") {
              this.piercing = true
              this.texture = PIXI.loader.resources.plaser.texture
          } else if(this.projectileType == "superlaser") {
              this.piercing = true
              this.despawn = true
              this.spawnTime = Date.now()
              this.texture = PIXI.loader.resources.slaser.texture
          } else if(this.projectileType == "sword") {
              this.texture = PIXI.loader.resources.plaser.texture
              this.scale.x = 2
              this.piercing = true
          } else {
              this.texture = PIXI.loader.resources.projectile.texture
          }
      } else {
          Projectile.EnemyInventory.push(this)
          this.texture = PIXI.loader.resources.enemyProjectile.texture
      }

      if (this.projectileType === "sineup" || this.projectileType === "sinedown") {
          this.t = 0
      }
  }

  update(delta) {
      if(this.projectileType == "sword") {
          this.position.x = this.shotBy.x + this.shotBy.width
          this.position.y = this.shotBy.y + this.shotBy.height / 2
      } else {
          this.position.x += this.vector.x * this.bulletSpeed
          this.position.y += this.vector.y * this.bulletSpeed
      }

      if(this.projectileType == "paintShot") {
          this.rotation += 1
          this.scale.x = Math.random() * 3
          this.scale.y = Math.random() * 3

          this.vector.y += .05
      }

      if (this.position.x < 0 || this.position.x > Reference.GAME_WIDTH ||
          this.position.y < 0 || this.position.y > Reference.GAME_HEIGHT) {
          this.destroy()
      }

      if(this.despawn == true) {
          this.scale.y += .05
          this.position.y += .1
          if (Date.now() - this.spawnTime >= Reference.SUPER_DESPAWN) {
              this.destroy()
          }
      }

      if(this.projectileType == "mine" || this.projectileType == "superMine") {
          this.rotation += 1
      }

      if(this.projectileType == "mine") {
          this.scale.x = 3
      }

      if(this.projectileType == "superMine") {
          this.scale.x = 5
          this.scale.y = 3
      }

      if (this.projectileType === "sineup" || this.projectileType === "sinedown") {
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


  onCollision(collidedWith) {
      if(this.projectileType == "mine") {
          this.onHit.explodeEnemy(this)
          var curMine = this.shotBy.mineArray.indexOf(this)
          delete this.shotBy.mineArray[curMine]
          this.destroy()
      } else if(this.projectileType == "superMine") {
          this.onHit.explodePlayer(this)
          var curMine = this.shotBy.mineArray.indexOf(this)
          delete this.shotBy.mineArray[curMine]
          this.destroy()
      } else if(this.piercing != true) {
          this.destroy()
      } else {
      }
  }

  destroy() {
      game.removeChild(this)
      if (this.friendly) {
          Projectile.FriendlyInventory.splice(Projectile.FriendlyInventory.indexOf(this), 1)
      } else {
          Projectile.EnemyInventory.splice(Projectile.EnemyInventory.indexOf(this), 1)
      }
      super.destroy()
  }
}

Projectile.FriendlyInventory = []
Projectile.EnemyInventory = []
