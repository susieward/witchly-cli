const { exec, spawn } = require("child_process")
const path = require("path")
const fs = require('fs')
const fse = require('fs-extra')

const deps = ['@babel/core', 'babel-cli', '@babel/preset-react', 'babel-loader', 'webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin', 'css-loader', 'style-loader']

function init(appName) {
  const cwd = process.cwd()
  const root = path.join(cwd, appName)
  const templateDir = path.resolve(__dirname, 'lib/template')

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  const destDir = path.resolve(root)
  
  fse.copySync(templateDir, destDir, { overwrite: true }, (err) => {
    if (err) {
      console.error(err)
    }
  })

  const package = {
    "name": appName,
    "version": "1.0.0",
    "description": "",
    "main": "src/main.js",
    "scripts": {
      "serve": "webpack-dev-server",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "keywords": []
  }

  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(package, null, 2))

  try {
    const cmd = `cd ${root} && npm install witchly && npm install --save-dev ${deps.join(' ')} && cd ../`
    console.log('Installing dependencies, please wait...')
    run(cmd)
  } catch (err) {
    console.error(`${err}`)
  }
}

function run(cmd) {
  return exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return console.log(`Error: ${error.message}`)
    }
    return console.log('Done!')
  })
}

function runCmd(cmd, args, callback) {
  let child = spawn(cmd, args)
  let resp = ""

  child.stdout.on("data", (buffer) => {
    resp += buffer.toString()
  })
  child.stdout.on("end", () => {
    callBack(resp);
  })
}

module.exports = init
