import React, { Component } from 'react'
import { TouchableHighlight, View, Text } from 'react-native'

import styles from './style'

export default class PanicButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.button}>
        <Text style={styles.text}>¡NECESITO AYUDA!</Text>
      </TouchableHighlight>
    )
  }
}
