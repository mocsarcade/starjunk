var Pixi = require("pixi.js")

exports.initTex = function initTex() {
    PIXI.loader
        .add("redJunkership", require("./images/red-starship.png"))
        .add("yellowJunkership", require("./images/yellow-starship.png"))
        .add("greenJunkership", require("./images/green-starship.png"))
        .add("blueJunkership", require("./images/blue-starship.png"))
        .add("projectile", require("./images/projectile.png"))
        .add("snakeTrashbot", require("./images/enemy-snake-starship.png"))
        .add("tankTrashbot", require("./images/enemy-tank-starship.png"))
        .add("junk", require("./images/junk.png"))
        .load()

    .on("complete", setup)
}

function setup() {
    game.spawnWave()
}