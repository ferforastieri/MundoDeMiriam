import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './firebase' // Importa a configuração do Firebase

// Cria e monta a aplicação Vue
const app = createApp(App)
app.use(router)
app.mount('#app')
