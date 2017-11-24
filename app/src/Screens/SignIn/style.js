import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: colors.main
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
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
    ...fonts.text
  },
  instructions: {
    color: colors.title,
    marginHorizontal: metrics.padding,
    textAlign: 'center',
    ...fonts.detail
  },
  button: {
    backgroundColor: colors.title
  },
  buttonText: {
    color: '#3f51b5'
  }
})
