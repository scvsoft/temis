import React, { Component } from 'react'
import { View } from 'react-native'
import { goHome } from 'app/Api/Navigation'
import Button from 'app/Components/Button'
import styles from './style'
import I18n from 'app/Locales'

export default class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={goHome} text={I18n.t('screens.signIn.button')} />
      </View>
    )
  }
}
