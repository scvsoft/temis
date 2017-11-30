import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './style'

export default class FormBox extends Component {
  render() {
    return <View style={styles.container}>{this.props.children}</View>
  }
}
