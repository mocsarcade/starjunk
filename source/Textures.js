var Pixi = require("pixi.js")

exports.initTex = function initTex() {
    PIXI.loader
        .add("redJunkership",    require("./images/red-starship.png"))
        .add("yellowJunkership", require("./images/yellow-starship.png"))
        .add("greenJunkership",  require("./images/green-starship.png"))
        .add("blueJunkership",   require("./images/blue-starship.png"))
        .add("projectile",       require("./images/projectile.png"))
        .add("trashbot",         require("./images/enemy-starship.png"))
        .load()

        .on("complete",setup)
}

function setup() {
    game.spawnWave()
}
