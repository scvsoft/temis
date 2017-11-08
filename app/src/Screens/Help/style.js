import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.title,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },

  buttonDesc: {
    ...fonts.text,
    color: colors.text,
    textAlign: 'center',
    padding: metrics.padding
  }
})
