import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  buttonDesc: {
    ...fonts.text,
    backgroundColor: 'transparent',
    color: colors.text,
    textAlign: 'center',
    padding: metrics.padding
  }
})
