import React, { Component } from 'react'
import { Text, View } from 'react-native'

import PanicButton from 'app/Components/PanicButton'
import styles from './style'

export default class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PanicButton />
      </View>
    )
  }
}
