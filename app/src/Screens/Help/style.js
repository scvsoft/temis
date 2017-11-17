import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
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
