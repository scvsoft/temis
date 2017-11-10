import { StyleSheet } from 'react-native'
import { colors, fonts } from 'app/Theme'

export default StyleSheet.create({
  button: {
    backgroundColor: colors.danger,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 150
  },
  text: {
    ...fonts.h1,
    textAlign: 'center',
    color: colors.title
  }
})
