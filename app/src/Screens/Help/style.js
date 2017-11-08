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
  buttonDesc: {
    ...fonts.text,
    backgroundColor: 'transparent',
    color: colors.text,
    textAlign: 'center',
    padding: metrics.padding
  }
})
