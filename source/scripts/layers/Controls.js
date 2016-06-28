var Keyb = require("keyb")

export class keybCont {
    constructor(index) {
        this.index = index
        this.type = "keyb"
        this.ignoreX = null
        this.ignoreY = null
    }
    isDown(key) {
        switch (key) {
        case "up":
            if(this.ignoreY != key) {
                return Keyb.isDown(exports.ControlScheme.keys[this.index].up)
            } else {
                return false
            }
            break
        case "down":
            if(this.ignoreY != key) {
                return Keyb.isDown(exports.ControlScheme.keys[this.index].down)
            } else {
                return false
            }
            break
        case "left":
            if(this.ignoreX != key) {
                return Keyb.isDown(exports.ControlScheme.keys[this.index].left)
            } else {
                return false
            }
            break
        case "right":
            if(this.ignoreX != key) {
                return Keyb.isDown(exports.ControlScheme.keys[this.index].right)
            } else {
                return false
            }
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

    resolveConflicts() {
        if (this.justDown("up")) {
            this.ignoreY = "down"
        }
        if (this.justDown("down")) {
            this.ignoreY = "up"
        }
        if (this.justDown("left")) {
            this.ignoreX = "right"
        }
        if (this.justDown("right")) {
            this.ignoreX = "left"
        }
        if (this.justUp("up") || this.justUp("down")) {
            this.ignoreY = null
        }
        if (this.justUp("left") || this.justUp("right")) {
            this.ignoreX = null
        }
    }
}

export class padCont {
    constructor(index) {
        this.index = index
        this.type = "pad"
        this.data = []
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

    justDown(key) {
        if (this.isDown(key)) {
            if (this.data[key]) {
                return false
            } else {
                this.data[key] = true
                return true
            }
        } else {
            if (this.data[key]) {
                this.data[key] = false
                return false
            } else {
                return false
            }
        }
    }
    justUp(key) {

    }

    resolveConflicts() {
    }
}

export var keybArray = [new keybCont(0), new keybCont(1), new keybCont(2)]
export var padArray = [new padCont(0), new padCont(1), new padCont(2), new padCont(3)]

export var ControlScheme = {
    WASD: 0,
    NUM_PAD: 1,
    ARROW_KEYS: 2,
    keys: [
        {up: "W", down: "S", left: "A", right: "D", fire: "<space>", inUse: false, isKeyb: true},
        {up: "<num-8>", down: "<num-2>", left: "<num-4>", right: "<num-6>", fire: "<num-0>", inUse: false, isKeyb: true},
        {up: "<up>", down: "<down>", left: "<left>", right: "<right>", fire: ".", inUse: false, isKeyb: true},
    ],
    padsInUse: [false, false, false, false],
    activateControls: function () {
        for (var i = 0; i < exports.keybArray.length; i++) {
            if (!this.keys[i].inUse && (
                exports.keybArray[i].justDown("up") ||
                exports.keybArray[i].justDown("down") ||
                exports.keybArray[i].justDown("left") ||
                exports.keybArray[i].justDown("right") ||
                exports.keybArray[i].justDown("fire"))) {
                this.keys[i].inUse = true
                return exports.keybArray[i]
            }
        }
        for (var i = 0; i < exports.padArray.length; i++) {
            if (game.gamepads[i]) {
                if (!ControlScheme.padsInUse[i] && (
                    exports.padArray[i].justDown("up") ||
                    exports.padArray[i].justDown("down") ||
                    exports.padArray[i].justDown("left") ||
                    exports.padArray[i].justDown("right") ||
                    exports.padArray[i].justDown("fire"))) {
                    this.padsInUse[i] = true
                    return exports.padArray[i]
                }
            }
        }

        return null
    }
}
