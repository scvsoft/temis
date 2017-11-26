import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import styles from './style'

export default class Spinner extends Component {
  render() {
    return this.props.visible ? (
      <TouchableWithoutFeedback
        onPress={() => {
          console.tron.log('PRESS')
        }}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </TouchableWithoutFeedback>
    ) : null
  }
}

Spinner.defaultProps = {
  visble: false
}
