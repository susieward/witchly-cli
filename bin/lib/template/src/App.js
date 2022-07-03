import Header from '@/components/Header'

const App = () => {
  const name = 'witchly-app'
  const components = { Header }
  const message = 'Welcome to your new Witchly.js app!'

  const template = (vm) => {
    return (
      <div id="app">
        <app-header message={vm.message}></app-header>
        <router-view></router-view>
      </div>
    )
  }

  return { name, components, message, template }
}

export default App
