import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faUser, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faLock, faUser, faMagnifyingGlass, faChevronDown)
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(router)
app.use(pinia)

app.mount('#app')


