import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { goHome } from 'app/Api/Navigation'
import { login } from 'app/Api/Facebook'
import Button from 'app/Components/Button'
import styles from './style'
import I18n from 'app/Locales'
import images from 'app/Theme/images'

export default class Help extends Component {
  componentWillMount() {
    this.props.navigator.setStyle({
      navBarHidden: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={images.background2} />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={images.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          {I18n.t('screens.signIn.description')}
        </Text>
        <View>
          <Text style={styles.instructions}>
            {I18n.t('screens.signIn.instructions')}
          </Text>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={login}
            text={I18n.t('screens.signIn.button')}
          />
        </View>
      </View>
    )
  }
}
