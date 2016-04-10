var Keyb = require("keyb")

export class keybCont {
    constructor(index) {
        this.index = index
        this.type = "keyb"
    }
    isDown(key) {
        switch (key) {
        case "up":
            return Keyb.isDown(exports.ControlScheme.keys[this.index].up)
            break
        case "down":
            return Keyb.isDown(exports.ControlScheme.keys[this.index].down)
            break
        case "left":
            return Keyb.isDown(exports.ControlScheme.keys[this.index].left)
            break
        case "right":
            return Keyb.isDown(exports.ControlScheme.keys[this.index].right)
            break
        case "fire":
            return Keyb.isDown(exports.ControlScheme.keys[this.index].fire)
            break
        default:
            console.log("Invalid keybCont isDown call: " + key)
            return null
        }
    }
    justDown(key) {
        switch (key) {
        case "up":
            return Keyb.isJustDown(exports.ControlScheme.keys[this.index].up)
            break
        case "down":
            return Keyb.isJustDown(exports.ControlScheme.keys[this.index].down)
            break
        case "left":
            return Keyb.isJustDown(exports.ControlScheme.keys[this.index].left)
            break
        case "right":
            return Keyb.isJustDown(exports.ControlScheme.keys[this.index].right)
            break
        case "fire":
            return Keyb.isJustDown(exports.ControlScheme.keys[this.index].fire)
            break
        default:
            console.log("Invalid keybCont isDown call: " + key)
            return null
        }
    }
    justUp(key) {
        switch (key) {
        case "up":
            return Keyb.isJustUp(exports.ControlScheme.keys[this.index].up)
            break
        case "down":
            return Keyb.isJustUp(exports.ControlScheme.keys[this.index].down)
            break
        case "left":
            return Keyb.isJustUp(exports.ControlScheme.keys[this.index].left)
            break
        case "right":
            return Keyb.isJustUp(exports.ControlScheme.keys[this.index].right)
            break
        case "fire":
            return Keyb.isJustUp(exports.ControlScheme.keys[this.index].fire)
            break
        default:
            console.log("Invalid keybCont.justUp call: " + key)
            return null
        }
    }
}

export class padCont {
    constructor(index) {
        this.index = index
        this.type = "pad"
    }
    isDown(key) {
        switch (key) {
        case "up":
            return (game.gamepads[this.index].buttons[12].pressed ||
                game.gamepads[this.index].axes[1] <= -.5)
            break
        case "down":
            return (game.gamepads[this.index].buttons[13].pressed ||
                game.gamepads[this.index].axes[1] >= .5)
            break
        case "left":
            return (game.gamepads[this.index].buttons[14].pressed ||
                game.gamepads[this.index].axes[0] <= -.5)
            break
        case "right":
            return (game.gamepads[this.index].buttons[15].pressed ||
                game.gamepads[this.index].axes[0] >= .5)
            break
        case "fire":
            return (game.gamepads[this.index].buttons[0].pressed ||
                    game.gamepads[this.index].buttons[1].pressed ||
                    game.gamepads[this.index].buttons[2].pressed ||
                    game.gamepads[this.index].buttons[3].pressed ||
                    game.gamepads[this.index].buttons[5].pressed ||
                    game.gamepads[this.index].buttons[7].pressed)
            break
        default:
            console.log("Invalid padCont isDown call: " + key)
            return null
        }
    }
    // Dummy behavior for compatibility
    justDown(key) {
        return false
    }
    justUp(key) {
        return false
    }
}

export var ControlScheme = {
    WASD: 0,
    NUM_PAD: 1,
    ARROW_KEYS: 2,
    keys: {
        0: {up: "W", down: "S", left: "A", right: "D", fire: "<space>", inUse: false, isKeyb: true},
        1: {up: "<num-8>", down: "<num-2>", left: "<num-4>", right: "<num-6>", fire: "<num-0>", inUse: false, isKeyb: true},
        2: {up: "<up>", down: "<down>", left: "<left>", right: "<right>", fire: ".", inUse: false, isKeyb: true},
    },
    padsInUse: [false, false, false, false]
}

export var keybArray = [new keybCont(0), new keybCont(1), new keybCont(2)]
export var padArray = [new padCont(0), new padCont(1), new padCont(2), new padCont(3)]

export var controlTypeCount = Object.keys(exports.ControlScheme).length -2
