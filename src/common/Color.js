let primary = '#5842D7'
let secondary = '#BF97F2'
let tertiary = '#5A84EE'
export default {
  primaryDark: '#cae166',
  primary: primary,
  danger: '#FF6262',
  warning: '#ffc107',
  secondary: secondary,
  white: '#fff',
  gray: '#cccccc',
  lightGray: '#eeeeee',
  darkGray: '#2b2b2b',
  normalGray: '#999',
  black: '#000',
  success: '#4BB543',
  goldenYellow: '#FFDF00',
  tertiary: tertiary,
  blue: '#2F80ED',
  containerBackground: '#fff',
  setPrimary(color){
    this.primary = color
  },
  setSecondary(color){
    this.secondary = color
  },
  setTertiary(color){
    this.tertiary = color
  }
}