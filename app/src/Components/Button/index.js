import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import I18n from 'app/Locales'
import styles from './style'

export default class Button extends Component {
  render() {
    const { buttonStyle, textStyle, onPress, text } = this.props
    return (
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  buttonStyle: {},
  textStyle: {}
}
