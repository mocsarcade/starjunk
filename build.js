var fs = require("fs")
var path = require("path")
var gulp = require("gulp")
var async = require("async")
var chalk = require("chalk")
var yargs = require("yargs")
var jsesc = require("jsesc")
var cssesc = require("cssesc")
var rimraf = require("rimraf")
var ansiup = require("ansi_up")

var Bluebird = require("bluebird")

var Webpack = require("webpack")
var WebpackText = require("extract-text-webpack-plugin")
var BrowserSync = require("browser-sync")

var isBundle = yargs.argv._.indexOf("bundle") != -1
var isServer = yargs.argv._.indexOf("server") != -1
var production = yargs.argv.production
var server

var getTime = function() {
    var date = new Date()
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    var seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
    return hours + ":" + minutes + ":" + seconds
}

var log = function(message) {
    console.log("[" + chalk.green(getTime()) + "]", message)
}

build = new Object()
build["web/index.js"] = function(done) {
    done = done || function() {}
    Webpack({
        entry: {
            "index.js": "./source/index.js"
        },
        output: {
            path: "./build/web",
            filename: "index.js"
        },
        node: {
            fs: "empty"
        },
        module: {
            loaders: [
                {test: /\.js$/i, exclude: /(node_modules)/i, loader: "babel-loader"},
                {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-Webpack-loader"]},
                {test: /\.s?css$/i, loaders: ["style-loader", "css-loader" + (isBundle ? "?minimize" : ""), "autoprefixer-loader", "sass-loader"]},
                {test: /\.json$/i, include: path.resolve("./node_modules/pixi.js"), loader: "json-loader"},
            ]
        },
        plugins: [
            new Webpack.DefinePlugin({
                SOURCE: JSON.stringify(path.join(__dirname, "./source")),
                DEVMODE: !isBundle,
            }),
            isBundle ? new Webpack.optimize.UglifyJsPlugin() : new Webpack.IgnorePlugin(/\index.html/i)
        ],
        watch: isServer,
    }, function(error, results) {
        if(!!error) {
            throw error
        } if(results.compilation.errors.length > 0) {
            var errors = results.compilation.errors.map(function(error) {
                return "<div>" + ansiup.ansi_to_html(error.toString()) + "</div>"
            }).join()
            errors = "<style>div{font-family:monospace;white-space:pre;}</style>" + errors
            errors = "document.body.innerHTML=\"" + jsesc(errors, {quotes: "double"}) + "\""
            fs.writeFile("./build/web/index.js", errors, function() {
                log("Built the JS (with errors!)")
                if(!!server && !!server.active) {
                    server.reload()
                }
                done()
            })
        } else {
            log("Built the JS")
            done()
        }
    })
}
build["web/index.css"] = function(done) {
    done = done || function() {}
    Webpack({
        watch: isServer,
        entry: {
            "index.css": "./source/index.css"
        },
        output: {
            path: "./build/web",
            filename: "index.css"
        },
        module: {
            loaders: [
                {test: /\.(ttf)$/i, loader: "url-loader"},
                {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-webpack-loader"]},
                {test: /\.s?css$/i, loader: WebpackText.extract(["css-loader" + (isBundle ? "?minimize" : ""), "autoprefixer-loader", "sass-loader"])},
            ]
        },
        plugins: [
            new WebpackText("index.css")
        ]
    }, function(error, results) {
        if(!!error) {
            throw error
        } if(results.compilation.errors.length > 0) {
            errors = results.compilation.errors.join("\n")
            errors = "body:before{content:\"" + cssesc(errors, {quotes: "double"}) + "\";}"
            errors = "body{font-family:monospace;white-space:pre;}" + errors
            fs.writeFile("./build/web/index.css", errors, function() {
                log("Built the CSS (with errors!)")
                done()
            })
        } else {
            log("Built the CSS")
            done()
        }
    })
}
build["web/index.html"] = function(done) {
    done = done || function() {}
    gulp.src("./source/index.html")
        .pipe(gulp.dest("./build/web"))
        .on("end", function() {
            log("Built the HTML")
            done()
        })
}

var Inliner = require("inliner")
build["web1/index.html"] = function(done) {
    done = done || function() {}
    new Inliner("./build/web/index.html", function(error, file) {
        if(!!error) {
            throw error
        } else {
            fs.writeFile("./build/index.html", file, function(error) {
                if(!!error) {
                    throw error
                }
                log("Built the HTML1")
                done()
            })
        }
    })
}

// var gulp_inline = require("gulp-inline")
// var gulp_minify_html = require("gulp-minify-html")
// build["web1/index.html"] = function(done) {
//     done = done || function() {}
//     gulp.src("./build/web/index.html")
//         .pipe(gulp_inline({base: "./build/web"}))
//         .pipe(gulp_minify_html())
//         .pipe(gulp.dest("./build/web1"))
//         .on("end", function() {
//             log("Built the HTML1")
//             done()
//         })
// }

if(isBundle) {
    rimraf("./build", function() {
        async.parallel([
            build["web/index.js"],
            build["web/index.css"],
            build["web/index.html"],
        ], function() {
            build["web1/index.html"]()
        })
    })
}

if(isServer) {
    rimraf("./build", function() {
        build["web/index.js"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        build["web/index.css"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        build["web/index.html"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        log("Started the server")
        server = BrowserSync({
            server: "./build/web",
            logLevel: "silent",
            notify: false,
            port: 1701
        })
    })
}

if(!isServer && !isBundle) {
    console.log("nothing here yet")
}

// packaging updates
//     output single exe or html
//     minify html and css and js
//     upload to github pages
//     remove tests/lint via flag
//     bumps minor/major version
//     log time to webpack
// developing updates
//     watch for html changes
//     include source maps for chrome debugging
//     include test/lint results in bundle
// miscellaneous updates
//     downloads dependencies
// fix bugs
//     error sometimes breaks watch
//     better styling for injected errors
//
// NodeWebkitBuilder: https://github.com/nwjs/nw-builder
// Webpack.DefinePlugn: https://github.com/petehunt/webpack-howto#6-feature-flags
// Webpack.UglifyJsPlugin: https://webpack.github.io/docs/list-of-plugins.html
