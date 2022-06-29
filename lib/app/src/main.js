import Witchly from 'witchly'
import App from './App'
import router from './router'

new Witchly({
  render: () => App,
  router
})
