import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  description: {
    ...fonts.detail,
    color: colors.light,
    paddingHorizontal: metrics.padding
  }
})
