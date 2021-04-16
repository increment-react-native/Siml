
let primary = '#5842D7'
let secondary = '#FFCC00'
let tertiary = '#4CCBA6'
let fourth = '#F88BFF'
let gradient = ['#987BE7', '#9276E6', '#5741D7']
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
  fourth: fourth,
  gradient: gradient,
  setPrimary(color){
    this.primary = color
  },
  setSecondary(color){
    this.secondary = color
  },
  setTertiary(color){
    this.tertiary = color
  },
  setFourth(color){
    fourth = color
  },
  setGradient(colors){
    gradient = colors
  }
}