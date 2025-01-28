import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import Tooltip from 'primevue/tooltip';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router)
});


app.use(pinia)
app.use(router)
app.use(PrimeVue,
  { theme: {
    preset: Aura,
    options: {
        cssLayer: {
            name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
        darkModeSelector: 'system',
        }
    }
}}
)
app.directive('tooltip', Tooltip);
app.mount('#app')