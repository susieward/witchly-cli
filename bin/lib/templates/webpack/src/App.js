const Header = () => import('@/components/Header')

const App = () => {
  const name = 'witchly-app'
  const components = { Header }
  const state = () => ({ message: '' })

  return {
    name,
    components,
    state,
    createdCallback() {
      this.message = 'Welcome to your new Witchly.js app!'
    },
    render() {
      return (
        <div id="app">
          <app-header message={this.message}></app-header>
          <router-view></router-view>
        </div>
      )
    }
  }
}

export default App
