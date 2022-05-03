// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.base,
          secondary: colors.teal.lighten4,
          accent: colors.teal.darken1,
          grey: colors.grey.lighten5,
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.grey.darken4,
          secondary: colors.grey.darken3,
          accent: colors.teal.accent2,
          grey: colors.grey.darken2,
        }
      },
    },
  },
})