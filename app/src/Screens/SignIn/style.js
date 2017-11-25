import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.main
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    height: 65
  },
  description: {
    color: colors.title,
    flexGrow: 1,
    marginHorizontal: metrics.padding,
    textAlign: 'center',
    backgroundColor: 'transparent',
    ...fonts.text
  },
  instructions: {
    color: colors.title,
    marginHorizontal: metrics.padding,
    textAlign: 'center',
    backgroundColor: 'transparent',
    ...fonts.detail
  },
  button: {
    backgroundColor: colors.title
  },
  buttonText: {
    color: '#3f51b5'
  }
})
