import Header from '@/components/Header'

const App = () => {
  const el = 'witchly-app'
  const components = { Header }
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]

  return {
    el,
    components,
    get template() {
      return (
        <div id="app">
          <app-header></app-header>
          <main class="main">
            <router-view></router-view>
          </main>
        </div>
      )
    }
  }
}

export default App
