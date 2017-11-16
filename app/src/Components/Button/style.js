import { StyleSheet, Platform } from 'react-native'
import { colors, fonts, metrics } from 'app/Theme'

export default StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    alignSelf: 'stretch',
    margin: metrics.padding,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 18 : 2
  },
  text: {
    ...fonts.emphasis,
    width: '90%',
    textAlign: 'center',
    color: colors.accent
  }
})
