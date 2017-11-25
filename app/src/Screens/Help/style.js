import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  textContainer: {
    justifyContent: 'space-between',
    flexGrow: 1
  },
  descText: {
    ...fonts.text,
    backgroundColor: 'transparent',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: metrics.padding
  }
})
