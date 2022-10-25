import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {DisplayBreakpoint, DisplayThresholds} from "vuetify/vuetify";

const themes = {
  light: {
    dark: false,
    colors: {
      primary: '#EC752E',
      secondary: '#9C27B0',
      accent: '#E91E63',
      info: '#00CAE3',
      success: '#4CAF50',
      warning: '#FB8C00',
      error: '#FF5252',
      footBG: '#FAFAFA',
      headerBG: '#FFFFFF',
      delDialog: '#FEF8F8',
      confirmDialog: '#FDF9F4',
      mainBG: '#F4F6FA'
    }
  },
  dark: {
    dark: true,
    colors: {
      primary: '#ec752e',
      secondary: '#9C27b0',
      accent: '#e91e63',
      info: '#00CAE3',
      success: '#4CAF50',
      warning: '#FB8C00',
      error: '#FF5252',
      footBG: '#1f1f1f',
      headerBG: '#121212',
      delDialog: '#211e1e',
      confirmDialog: '#1f1e1d',
      mainBG: '#000000'
    }
  }
}

interface DisplayOptions {
  mobileBreakpoint?: number | DisplayBreakpoint;
  thresholds?: Partial<DisplayThresholds>;
}

const display: DisplayOptions = {
  mobileBreakpoint: 'sm',
  thresholds: {
    xs: 0,
    sm: 340,
    md: 540,
    lg: 800,
    xl: 1280
  }
}

export default createVuetify({
  components,
  directives,
  display,
  theme: {
    defaultTheme: 'light',
    themes
  }
})