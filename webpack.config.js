module.exports = {
    entry: "./client",
    output: {
        path: "./public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              exclude: /node_modules/,
              loader: "style!css"
            },
            { test: /\.js$/, loader: "babel-loader" }
        ]
    }
};
