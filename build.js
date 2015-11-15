var fs = require("fs")
var path = require("path")
var gulp = require("gulp")
var yargs = require("yargs")
var jsesc = require("jsesc")
var cssesc = require("cssesc")
var rimraf = require("rimraf")
var ansiup = require("ansi_up")

var Webpack = require("webpack")
var WebpackText = require("extract-text-webpack-plugin")
var BrowserSync = require("browser-sync")

var isBundle = yargs.argv._.indexOf("bundle") != -1
var server, isServer = yargs.argv._.indexOf("server") != -1

rimraf("./build", function() {
    gulp.src("./source/index.html")
        .pipe(gulp.dest("./build/web"))
        .on("end", function() {
            console.log("html'd")
            if(!!server && !!server.active) {
                server.reload()
            }
        })
    Webpack({
        watch: isServer,
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
        ]
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
                console.log("js'd w/ errs!")
                if(!!server && !!server.active) {
                    server.reload()
                }
            })
        } else {
            console.log("js'd!")
            if(!!server && !!server.active) {
                server.reload()
            }
        }
    })
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
                console.log("css'd w/ errs!")
                if(!!server && !!server.active) {
                    server.reload()
                }
            })
        } else {
            console.log("css'd!")
            if(!!server && !!server.active) {
                server.reload()
            }
        }
    })
    if(isServer) {
        setTimeout(function() {
            server = BrowserSync({
                server: "./build/web",
                logLevel: "silent",
                notify: false,
                port: 1234
            })
        }, 100)
    }
})

// developing updates
//     watch for html changes
//     log intelligently to the console
//         start and stop of each step
//         duration/timestamp of each step
//     include source maps for chrome debugging
//     include test/lint results in bundle
// packaging updates
//     output single exe or html
//     minify html and css and js
//     upload to github pages
//     remove tests/lint via flag
//     bumps minor/major version
// miscellaneous updates
//     downloads dependencies
//
// NodeWebkitBuilder: https://github.com/nwjs/nw-builder
// Webpack.DefinePlugn: https://github.com/petehunt/webpack-howto#6-feature-flags
// Webpack.UglifyJsPlugin: https://webpack.github.io/docs/list-of-plugins.html
