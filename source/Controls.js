var Keyb = require("keyb")

import Reference from "./Reference.js"

exports.isDown = function isDown(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isDown(Reference.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isDown(Reference.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isDown(Reference.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isDown(Reference.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isDown(Reference.ControlScheme.keys[index].fire)
            break
        }
    } else {
        switch (key) {
        case "up":
            break
        case "down":
            break
        case "left":
            break
        case "right":
            break
        case "fire":
            break
        }
    }
}

exports.justUp = function justUp(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isJustUp(Reference.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isJustUp(Reference.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isJustUp(Reference.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isJustUp(Reference.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isJustUp(Reference.ControlScheme.keys[index].fire)
            break
        }
    } else {
        switch (key) {
        case "up":
            break
        case "down":
            break
        case "left":
            break
        case "right":
            break
        case "fire":
            break
        }
    }
}

exports.justDown = function justDown(usesKeyb, index, key) {
    if (usesKeyb) {
        switch (key) {
        case "up":
            return Keyb.isJustDown(Reference.ControlScheme.keys[index].up)
            break
        case "down":
            return Keyb.isJustDown(Reference.ControlScheme.keys[index].down)
            break
        case "left":
            return Keyb.isJustDown(Reference.ControlScheme.keys[index].left)
            break
        case "right":
            return Keyb.isJustDown(Reference.ControlScheme.keys[index].right)
            break
        case "fire":
            return Keyb.isJustDown(Reference.ControlScheme.keys[index].fire)
            break
        }
    } else {
        switch (key) {
        case "up":
            break
        case "down":
            break
        case "left":
            break
        case "right":
            break
        case "fire":
            break
        }
    }
}
