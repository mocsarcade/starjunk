var Pixi = require("pixi.js")
var Reference = require("Reference.js")
var Victor = require("victor")

export default class Projectile extends Pixi.Sprite {

  constructor(x, y, vector, shotBy, bulletSpeed, projectileType, friendly) {
      super()
      this.x = x
      this.y = y
      this.vecX = vector.x
      this.vecY = vector.y
      this.bulletSpeed = bulletSpeed
      this.shotBy = shotBy
      this.projectileType = projectileType
      this.friendly = (friendly === undefined) ? true : friendly
      if (this.friendly) {
          if(this.projectileType == "bullet") {
              Projectile.FriendlyInventory.push(this)
              this.texture = PIXI.loader.resources.projectile.texture
          } else if(this.projectileType == "laser") {
              Projectile.FriendlyInventory.push(this)
              this.texture = PIXI.loader.resources.laser.texture
              console.log("Laser")
          } else if(this.projectileType == "piercinglaser") {
              this.piercing = true
              Projectile.FriendlyInventory.push(this)
              this.texture = PIXI.loader.resources.plaser.texture
              console.log("piercingLaser")
          } else if(this.projectileType == "superlaser") {
              this.piercing = true
              this.despawn = true
              this.spawnTime = Date.now()
              Projectile.FriendlyInventory.push(this)
              this.texture = PIXI.loader.resources.slaser.texture
              console.log("superLaser")
          }
      } else {
          Projectile.EnemyInventory.push(this)
          this.texture = PIXI.loader.resources.enemyProjectile.texture
      }
  }

  update(delta) {
      this.position.x += this.vecX * this.bulletSpeed
      this.position.y += this.vecY * this.bulletSpeed

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
  }


  onCollision(collidedWith) {
      if(this.piercing != true)
          this.destroy()
      else {
          console.log("works")
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
