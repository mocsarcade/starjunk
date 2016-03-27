var Keyb = require("keyb")

exports.isDown = function isDown(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isDown(exports.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isDown(exports.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isDown(exports.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isDown(exports.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isDown(exports.ControlScheme.keys[index].fire)
            break
        }
    } else {
        switch (key) {
        case "up":
            return (game.gamepads[index].buttons[12].pressed ||
                game.gamepads[index].axes[1] <= -.5)
            break
        case "down":
            return (game.gamepads[index].buttons[13].pressed ||
                game.gamepads[index].axes[1] >= .5)
            break
        case "left":
            return (game.gamepads[index].buttons[14].pressed ||
                game.gamepads[index].axes[0] <= -.5)
            break
        case "right":
            return (game.gamepads[index].buttons[15].pressed ||
                game.gamepads[index].axes[0] >= .5)
            break
        case "fire":
            return (game.gamepads[index].buttons[0].pressed ||
                    game.gamepads[index].buttons[1].pressed ||
                    game.gamepads[index].buttons[2].pressed ||
                    game.gamepads[index].buttons[3].pressed)
            break
        }
    }
}

exports.justUp = function justUp(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isJustUp(exports.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isJustUp(exports.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isJustUp(exports.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isJustUp(exports.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isJustUp(exports.ControlScheme.keys[index].fire)
            break
        }
    } else {
        // These should be unnecessary and aren't really trackable due to the
        // gamepad API's lack of button state events. Left in to show possible
        // errors
        switch (key) {
        case "up":
            console.log("Meaningless justUp up call to pad " + index)
            break
        case "down":
            console.log("Meaningless justUp down call to pad " + index)
            break
        case "left":
            console.log("Meaningless justUp left call to pad " + index)
            break
        case "right":
            console.log("Meaningless justUp right call to pad " + index)
            break
        case "fire":
            console.log("Meaningless justUp fire call to pad " + index)
            break
        }
    }
}

exports.justDown = function justDown(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isJustDown(exports.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isJustDown(exports.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isJustDown(exports.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isJustDown(exports.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isJustDown(exports.ControlScheme.keys[index].fire)
            break
        }
    } else {
        switch (key) {
            // These should be unnecessary and aren't really trackable due to the
            // gamepad API's lack of button state events. Left in to show possible
            // errors
        case "up":
            console.log("Meaningless justDown up call to pad " + index)
            break
        case "down":
            console.log("Meaningless justDown down call to pad " + index)
            break
        case "left":
            console.log("Meaningless justDown left call to pad " + index)
            break
        case "right":
            console.log("Meaningless justDown right call to pad " + index)
            break
        case "fire":
            console.log("Meaningless justDown fire call to pad " + index)
            break
        }
    }
}

exports.ControlScheme = {
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

exports.controlTypeCount = Object.keys(exports.ControlScheme).length -2
