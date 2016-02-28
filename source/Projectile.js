var Pixi = require("pixi.js")
var Reference = require("Reference.js")
var Victor = require("victor")

export default class Projectile extends Pixi.Sprite {

  constructor(x, y, vector, shotBy, bulletSpeed, projectileType) {
      super(PIXI.loader.resources.projectile.texture)
      this.x = x
      this.y = y
      this.vecX = vector.x
      this.vecY = vector.y
      this.bulletSpeed = bulletSpeed
      this.shotBy = shotBy
      this.projectileType = projectileType
  }

  update(delta) {
      this.position.x += this.vecX * this.bulletSpeed
      this.position.y += this.vecY * this.bulletSpeed

      if (this.position.x < 0 || this.position.x > Reference.GAME_WIDTH ||
          this.position.y < 0 || this.position.y > Reference.GAME_HEIGHT) {
          game.removeChild(this)
          this.destroy()
      }
  }


  onCollision(collidedWith) {
      game.removeChild(this)
      this.destroy()
  }




}
