const { exec } = require("child_process")
const path = require("path")
const fs = require('fs')

const configs = {
  jsx: {
    deps: ['@babel/core', 'babel-cli', '@babel/preset-react', 'babel-loader'],
    file: 'babel.config.json'
  },
  webpack: {
    deps: ['webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin'],
    file: 'webpack.config.js'
  }
}

function add(name) {
  let config = configs[name]
  if (config) {
    initConfig(config)
  } else {
    console.log('Invalid preset name: ', name)
  }
}

function initConfig(config) {
  const { file, deps } = config
  const cwd = process.cwd()
  const templateDir = path.resolve(__dirname, 'lib/template')
  const filePath = path.resolve(cwd, file)

  const content = fs.readFileSync(`${templateDir}/${file}`, 'utf-8')
  fs.writeFileSync(filePath, content)

  console.log('Installing dependencies...')
  return installDeps(deps)
}

function installDeps(deps) {
  const command = `npm install --save-dev ${deps.join(' ')}`
  return exec(command, (error, stdout, stderr) => {
    if (error) {
      return console.log(`error: ${error.message}`)
    }
    return console.log('Done!')
  })
}

module.exports = add
