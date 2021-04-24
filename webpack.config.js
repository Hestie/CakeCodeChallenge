const slsw = require('serverless-webpack');

module.exports = {
    devtool: 'nosources-source-map',
    entry: slsw.lib.entries,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint')

                        },
                        loader: require.resolve('eslint-loader')
                    }
                ],
                include: __dirname,
                exclude: ['/node_modules/', '.serverless', '.webpack', 'tests']
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: __dirname,
                exclude: /node_modules/
            }]
    }
};
