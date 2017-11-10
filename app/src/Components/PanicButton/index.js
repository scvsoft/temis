import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import I18n from 'app/Locales'

import styles from './style'

export default class PanicButton extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>{I18n.t('panicButton.text')}</Text>
      </TouchableOpacity>
    )
  }
}
