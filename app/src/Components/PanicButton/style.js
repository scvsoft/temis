import { StyleSheet } from 'react-native'
import { colors, fonts } from 'app/Theme'

export default StyleSheet.create({
  button: {
    backgroundColor: colors.danger,
    width: 224,
    height: 224,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150
  },
  text: {
    ...fonts.h1,
    textAlign: 'center',
    color: colors.title
  }
})
