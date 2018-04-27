const path = require('path');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
    mode: 'production',
    entry: path.join(paths.SRC, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'index.js',
        library: 'json-autocorrect',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
