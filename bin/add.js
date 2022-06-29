const { exec } = require("child_process")
const fs = require('fs')

const configs = {
  jsx: {
    deps: ['@babel/core', '@babel/preset-react', 'babel-loader'],
    filename: 'babel.config.json',
    content: `{
      "presets": [
        [
          "@babel/preset-react",
          {
            "runtime": "automatic",
            "importSource": "witchly"
          }
        ]
      ]
    }`
  },
  webpack: {
    deps: ['webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin'],
    filename: 'webpack.config.js',
    content: `const path = require("path")
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      mode: "development",
      entry: "src/main.js",
      output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.bundle.js"
      },
      resolve: {
        extensions: ['*', '.js']
      },
      devServer: {
        port: 8080,
        hot: true,
        historyApiFallback: true
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "./public/index.html")
        })
      ]
    }`
  }
}

function add(name) {
  if (name === 'jsx') {
    initConfig(configs.jsx)
  } else if (name == 'webpack') {
    initConfig(configs.webpack)
  }
}

function initConfig(config) {
  const { filename, content, deps } = config
  console.log('writing config files...')
  writeConfigFile(filename, content)
  console.log('installing dependencies...')
  return installDeps(deps)
}


function writeConfigFile(filename, content) {
  try {
    fs.writeFileSync(filename, content)
  } catch (err) {
    console.error(err)
  }
}


function installDeps(deps) {
  const command = `npm install --save-dev ${deps.join(' ')}`
  return exec(command, (error, stdout, stderr) => {
      if (error) {
        return console.log(`error: ${error.message}`)
      }
    return console.log('done')
  })
}

module.exports = add
