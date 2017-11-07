import { StyleSheet } from 'react-native'
import Colors from 'app/Theme/colors'

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.danger,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 150
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.title
  }
})
