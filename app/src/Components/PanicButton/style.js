import { StyleSheet } from 'react-native'
import { colors, fonts, metrics } from 'app/Theme'

export default StyleSheet.create({
  button: {
    backgroundColor: colors.danger,
    alignSelf: 'center',
    width: 250,
    height: 250,
    padding: metrics.padding,
    borderRadius: 150
  },
  text: {
    ...fonts.h1,
    width: '100%',
    color: colors.title
  }
})
