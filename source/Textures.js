var Pixi = require("pixi.js")

exports.initTex = function initTex() {
    PIXI.loader
        .add("redJunkership", require("./images/red-starship.png"))
        .add("yellowJunkership", require("./images/yellow-starship.png"))
        .add("greenJunkership", require("./images/green-starship.png"))
        .add("blueJunkership", require("./images/blue-starship.png"))
        .add("projectile", require("./images/projectile.png"))
        .add("enemyProjectile", require("./images/enemy-projectile.png"))
        .add("snakeTrashbot", require("./images/enemy-snake-starship.png"))
        .add("tankTrashbot", require("./images/enemy-tank-starship.png"))
        .add("sniperTrashbot", require("./images/enemy-sniper-starship.png"))
        .add("turretTrashbot", require("./images/enemy-turret-starship.png"))
        .add("junk", require("./images/junk.png"))
        .add("star", require("./images/star.png"))
        .add("laser", require("./images/laser.png"))
        .add("shield", require("./images/shield.png"))
        .add("plaser", require("./images/plaser.png"))
        .add("slaser", require("./images/slaser.png"))
        .add("boom", require("./images/boom-sheet.png"))
        .add("title", require("./images/title.png"))
        .load()

    .on("complete", setup)
}

function setup() {
    game.loadTitle()
}
