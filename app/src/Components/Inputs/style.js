import { StyleSheet, Platform } from 'react-native'
import { colors, metrics, fonts } from 'app/Theme'

const inputBox = {
  margin: metrics.padding
}

export default StyleSheet.create({
  inputBox,
  inlineInputBox: {
    ...inputBox,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    ...fonts.detail,
    color: colors.light,
    marginBottom: metrics.separator
  },
  inlineLabel: {
    ...fonts.text,
    flexGrow: 1,
    color: colors.text
  },
  textInput: {
    ...fonts.text,
    fontSize: 16,
    color: colors.text,
    padding: 0,
    borderBottomWidth: 1
  },
  picker: {
    ...fonts.text,
    color: colors.text
  },
  datePicker: {
    marginTop: -metrics.separator,
    width: '100%'
  }
})

export const datePickerInner = {
  btnTextConfirm: {
    color: colors.main
  },
  dateIcon: {
    position: 'absolute',
    right: 0
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: colors.light,
    alignItems: 'flex-start'
  },
  dateText: {
    ...fonts.text,
    color: colors.text
  }
}
