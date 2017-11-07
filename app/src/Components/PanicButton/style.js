import { StyleSheet } from 'react-native'
import Colors from 'app/Theme/colors'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.danger,
    width: 224,
    height: 224,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.title
  }
})
