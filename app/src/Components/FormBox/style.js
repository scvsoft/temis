import { StyleSheet } from 'react-native'
import { colors, metrics } from 'app/Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.sectionBackground,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: colors.text,
    elevation: 1,
    shadowOffset: { height: 0, width: 0 },
    width: '100%',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingVertical: metrics.padding
  }
})
