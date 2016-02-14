var Electron = require("electron")

Electron.app.on("ready", function() {
    var window = new Electron.BrowserWindow({width: 512, height: 288})
    window.loadURL("file://" + __dirname + "/builds/web/index.html")
})

Electron.app.on("window-all-closed", function() {
    Electron.app.quit()
})
