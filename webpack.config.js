const path = require('path');
const { argv } = require('yargs');

const outputDir = path.resolve(__dirname, argv.output || "dist");

module.exports = {
    entry: [
        __dirname + "/src/index.ts"
    ],
    output: {
        filename: "autotest.js",
        path: outputDir
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '')
        ],
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader"
            }

        ]
    }
};
