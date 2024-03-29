import Witchly from 'witchly'
const App = () => import('./App')
const Content = () => import('./components/Content')
import router from './router'
import './main.css'

Witchly.component(Content)

new Witchly({
  id: 'app',
  render: () => App,
  router
})
