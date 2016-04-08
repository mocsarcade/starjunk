var bgm = new Audio(require("./music/spacetime.mp3"))
bgm.loop = true

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
    
}
