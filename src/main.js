import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Leaflet CSS
import 'leaflet/dist/leaflet.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#ef4444',
          secondary: '#0ea5e9',
          accent: '#f59e0b',
          error: '#dc2626',
          warning: '#f59e0b',
          info: '#0ea5e9',
          success: '#10b981',
          surface: '#f8fafc',
          'on-surface': '#1f2937',
        }
      }
    }
  }
})

createApp(App).use(vuetify).mount('#app')