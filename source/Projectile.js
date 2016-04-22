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
      this.vecX = vector.x
      this.vecY = vector.y
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
                  if(shotBy.mineArray.length > 5) {
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
          }
      } else {
          Projectile.EnemyInventory.push(this)
          this.texture = PIXI.loader.resources.enemyProjectile.texture
      }
  }

  update(delta) {

      this.position.x += this.vecX * this.bulletSpeed
      this.position.y += this.vecY * this.bulletSpeed

      if(this.projectileType == "paintShot") {
          this.rotation += 1
          this.scale.x = Math.random() * 3
          this.scale.y = Math.random() * 3

          this.vecY += .05

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
