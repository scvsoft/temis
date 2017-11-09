import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import images from 'app/Theme/images'
import styles from './style'

export default class ComingSoon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={images.background} />
        <Text style={styles.buttonDesc}>COMING SOON</Text>
      </View>
    )
  }
}
