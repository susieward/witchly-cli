const path = require("path")
const fs = require('fs-extra')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function create(appName) {
  const cwd = process.cwd()
  const root = path.join(cwd, appName)

  console.log(`Initializing new project in ${root}...`)

  const templateDir = path.resolve(__dirname, 'lib/template')

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  fs.copySync(templateDir, path.resolve(root), { overwrite: true })

  const pkg = {
    "name": appName,
    "version": "1.0.0",
    "description": "",
    "main": "src/main.js",
    "scripts": {
      "serve": "webpack-dev-server",
      "build": "webpack --config webpack.config.js --mode production",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "keywords": []
  }
  const content = JSON.stringify(pkg, null, 2)
  fs.writeFileSync(path.resolve(root, 'package.json'), content)

  // TO DO: install some/all based on selected user options
  const deps = [
    '@babel/core', '@babel/preset-react', 'babel-loader',
    'webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin',
    'css-loader', 'mini-css-extract-plugin', 'css-minimizer-webpack-plugin'
  ]
  const cmd = `${[
    `cd ${root}`,
    'npm install witchly',
    `npm install --save-dev ${deps.join(' ')}`,
    'cd ../'
  ].join(' && ')}`

  try {
    console.log('Installing dependencies, please wait...')
    const { stdout } = await exec(cmd)
    console.log(stdout)

    console.log('Done!')
    console.log('To run your new app:')
    console.log(`cd ${appName}`)
    console.log('npm run serve')
  } catch (err) {
    console.error(err)
  }
}

module.exports = create
