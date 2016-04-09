var nodeExternals = require('webpack-node-externals');

var config = {};
switch(process.env.WEBPACK_BUILD) {

  case 'bundle':
    config = {
      entry: './src/index.es6.js',
      output: {
        path: './dist/',
        filename: 'img-placeholder-src.bundle.js',
        library: 'IPS',
        libraryTarget: 'umd'
      },
      externals: [],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/, loader: "babel-loader",
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }
    break;
  case 'production':
    config = {
      entry: './src/index.es6.js',
      output: {
        path: './dist/',
        filename: 'img-placeholder-src.min.js',
        library: 'IPS',
        libraryTarget: 'umd'
      },
      externals: [nodeExternals()],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/, loader: "babel-loader",
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }
    break;

    case 'server':
      config = {
        entry: './src/index.es6.js',
        output: {
          library: 'IPS',
          libraryTarget: 'umd'
        },
        externals: [],
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/, loader: "babel-loader",
              query: {
                presets: ['es2015']
              }
            }
          ]
        }
      }
      break;

  default:
    config = {
      entry: './src/index.es6.js',
      output: {
          path: './dist/',
          filename: 'img-placeholder-src.js',
          library: 'IPS',
          libraryTarget: 'umd'
      },
      externals: [nodeExternals()],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/, loader: "babel-loader",
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }
    break;
}

module.exports = config;
