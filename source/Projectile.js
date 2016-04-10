var Pixi = require("pixi.js")
var Reference = require("Reference.js")
var Victor = require("victor")

export default class Projectile extends Pixi.Sprite {

  constructor(x, y, vector, shotBy, bulletSpeed, projectileType, piercing, friendly) {
      super()
      this.x = x
      this.y = y
      this.vecX = vector.x
      this.vecY = vector.y
      this.bulletSpeed = bulletSpeed
      this.shotBy = shotBy
      this.projectileType = projectileType
      this.piercing = piercing
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
      this.position.x += this.vecX * this.bulletSpeed
      this.position.y += this.vecY * this.bulletSpeed

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
