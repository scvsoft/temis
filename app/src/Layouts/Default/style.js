import { StyleSheet } from 'react-native'
import { colors } from 'app/Theme'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: colors.background
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
