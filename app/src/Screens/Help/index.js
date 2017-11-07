import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import PanicButton from 'app/Components/PanicButton'
import images from 'app/Theme/images'
import styles from './style'

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png'

export default class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={images.background}
          resizeMode="repeat"
        />
        <PanicButton />
      </View>
    )
  }
}
