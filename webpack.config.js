const path = require('path');
const pkg = require('./package.json')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'cratedb-sql-builder.common.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
