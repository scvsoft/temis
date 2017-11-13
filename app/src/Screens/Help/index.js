import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import PanicButton from 'app/Components/PanicButton'
import { images } from 'app/Theme'
import styles from './style'
import I18n from 'app/Locales'

export default class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={images.background} />
        <PanicButton />
        <Text style={styles.buttonDesc}>
          {I18n.t('screens.help.instructions')}
        </Text>
      </View>
    )
  }
}
