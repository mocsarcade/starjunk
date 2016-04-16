import Junkership from "./Junkership.js"
import Utility from "./Utility.js"
import Reference from "./Reference.js"

var bgm = new Audio(require("./music/spacetime.mp3"))
bgm.loop = true
bgm.volume = Reference.BG_VOLUME



exports.playBGM = function() {
    bgm.play()
}

exports.stopBGM = function() {
    if (bgm.currentTime != 0) {
        bgm.pause()
        bgm.currentTime = 0
    }
}

exports.playSFX = function(sound) {
    switch (sound) {
    case "getjunk":
        var getjunk = new Audio(require("./sounds/get-junk-2.wav"))
        getjunk.volume = 0.4
        getjunk.play()
        break
    case "smallshot":
        var smallshot = new Audio(require("./sounds/shoot-2.wav"))
        smallshot.volume = 0.4
        smallshot.play()
        break
    case "bigshot":
        var bigshot = new Audio(require("./sounds/shoot-8.wav"))
        bigshot.volume = 0.4
        bigshot.play()
        break
    case "crazyshot":
        var crazyshot
        switch (Utility.randomNumber(1,3)) {
        case 1:
            crazyshot = new Audio(require("./sounds/shoot-a-1.wav"))
            break
        case 2:
            crazyshot = new Audio(require("./sounds/shoot-a-2.wav"))
            break
        case 3:
            crazyshot = new Audio(require("./sounds/shoot-a-3.wav"))
            break
        default:
            console.log("Problem in crazyshot sound.")
        }
        crazyshot.volume = 0.2
        crazyshot.play()
        break
    case "smallboom":
        var smallboom = new Audio(require("./sounds/explosion-2.wav"))
        smallboom.volume = 0.3
        smallboom.play()
        break
    case "bigboom":
        var bigboom = new Audio(require("./sounds/big-explosion-1.wav"))
        bigboom.volume = 0.4
        bigboom.play()
        break
    case "pickup":
        var pickup = new Audio(require("./sounds/get-junk-1.wav"))
        pickup.volume = 0.4
        pickup.play()
        break
    case "hit":
        var hit = new Audio(require("./sounds/hit-5.wav"))
        hit.volume = 0.4
        hit.play()
        break
    case "menu-up":
        var menuUp = new Audio(require("./sounds/menu-up.wav"))
        menuUp.volume = 0.4
        menuUp.play()
        break
    case "menu-down":
        var menuDown = new Audio(require("./sounds/menu-down.wav"))
        menuDown.volume = 0.4
        menuDown.play()
        break
    case "menu-blip":
        var menuBlip = new Audio(require("./sounds/menu-blip.wav"))
        menuBlip.volume = 0.4
        menuBlip.play()
        break
    case "spawn":
        var spawn
        switch (Junkership.Inventory.length) {
        case 0:
            spawn = new Audio(require("./sounds/join-game-1.wav"))
            break
        case 1:
            spawn = new Audio(require("./sounds/join-game-3.wav"))
            break
        case 2:
            spawn = new Audio(require("./sounds/join-game-4.wav"))
            break
        case 3:
            spawn = new Audio(require("./sounds/join-game-5.wav"))
            break
        default:
            spawn = new Audio(require("./sounds/join-game-2.wav"))
        }
        spawn.volume = 0.4
        spawn.play()
        break
    case "BFG":
        var bfgTick, bfgShoot
        if (bfgTick === undefined || bfgTick == 0) {
            bfgShoot = new Audio(require("./sounds/shoot-c-1.wav"))
            bfgTick = 1
        } else if (bfgTick == 1) {
            bfgShoot = new Audio(require("./sounds/shoot-c-2.wav"))
            bfgTick = 2
        } else {
            bfgShoot = new Audio(require("./sounds/shoot-c-3.wav"))
            bfgTick = 0
        }
        bfgShoot.volume = 0.4
        bfgShoot.play()
        break
    default:
        console.log("Invalid sound: " + sound)
    }
}
