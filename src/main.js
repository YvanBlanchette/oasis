import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import { ToastService } from 'primevue';

const app = createApp(App);
const pinia = createPinia();

// Add Vue-Router as a plugin to pinia 
pinia.use(({ store }) => {
  store.router = markRaw(router)
});

app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.mount('#app')