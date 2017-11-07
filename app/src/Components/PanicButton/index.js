import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

import styles from './style'

export default class PanicButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>¡NECESITO AYUDA!</Text>
      </TouchableOpacity>
    )
  }
}
