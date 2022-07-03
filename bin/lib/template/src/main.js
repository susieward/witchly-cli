import Witchly from 'witchly'
import App from './App'
import router from './router'
import './main.css'

new Witchly({
  id: 'app',
  render: () => App,
  router
})
