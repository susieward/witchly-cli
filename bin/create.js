import path from "node:path"
import fs from 'fs-extra'
import util from 'node:util'
import { fileURLToPath } from 'node:url'
import child_process from 'node:child_process'
const exec = util.promisify(child_process.exec)
import { input, select } from '@inquirer/prompts'

const templateOptions = {
  vite: {
    serve: "vite",
    build: "vite build",
    deps: ['vite']
  },
  webpack: {
    serve: "webpack-dev-server",
    build: "webpack --config webpack.config.js --mode production",
    deps: [
      '@babel/core', '@babel/preset-react', 'babel-loader',
      'webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin',
      'css-loader', 'mini-css-extract-plugin', 'css-minimizer-webpack-plugin'
    ]
  }
}

async function create(appName) {
  const projectDir = await input({ message: 'Project name:', default: appName })
  const projectTemplate = await select({
    message: 'Select a build tool:',
    choices: [
      {
        name: 'Vite (recommended)',
        value: 'vite'
      },
      {
        name: 'webpack',
        value: 'webpack'
      }
    ]
  })

  const cwd = process.cwd()
  const root = path.join(cwd, projectDir)
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const templateDir = path.resolve(__dirname, `lib/templates/${projectTemplate}`)

  console.log(`Initializing new project in ${root}...`)

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }
  fs.copySync(templateDir, path.resolve(root), { overwrite: true })

  const options = templateOptions[projectTemplate]

  const pkg = {
    "name": appName,
    "version": "1.0.0",
    "description": "",
    "main": "src/main.js",
    "scripts": {
      "serve": options.serve,
      "build": options.build,
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "keywords": []
  }
  const content = JSON.stringify(pkg, null, 2)
  fs.writeFileSync(path.resolve(root, 'package.json'), content)

  const deps = options.deps
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

export default create
