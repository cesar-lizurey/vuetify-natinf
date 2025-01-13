import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { fr } from 'vuetify/locale';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  locale: {
    locale: 'fr',
    messages: { fr },
  },
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify).mount('#app');
