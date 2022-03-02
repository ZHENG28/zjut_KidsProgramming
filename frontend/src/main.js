import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'

const app = createApp(App)
app.use(element)
app.use(store).use(router).mount('#app')
