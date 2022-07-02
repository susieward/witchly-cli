import Witchly from 'witchly'
import App from './App'
import router from './router'

new Witchly({
  id: 'app',
  render: () => App,
  router
})
