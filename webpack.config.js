const webpack = require("webpack");
const path = require("path");

module.exports = [
    {
        // ============================================================================================
        // Online main.
        // ============================================================================================
        entry: [
            "./src/index.js"
        ],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "app.bundle.js",
            sourceMapFilename: "app.bundle.js.map",
            pathinfo: true
        },
        stats: "errors-only",
        devServer: {
            contentBase: [
                path.join(__dirname, "dist")
            ],
            port: 8001,
            stats: "errors-only",
            clientLogLevel: "none",
            watchContentBase: true,
            hot: false,
            quiet: true,
            inline: true
        },
        watchOptions: {
            ignored: "node_modules",
            aggregateTimeout: 300
        },
        target: "web",
        plugins: [
            // new webpack.DefinePlugin({
            //     "process.env": {
            //         NODE_ENV: JSON.stringify("development")
            //     }
            // })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }
];
