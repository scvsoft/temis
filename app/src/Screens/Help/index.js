import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import I18n from 'app/Locales'
import DefaultLayout from 'app/Layouts/Default'
import PanicButton from 'app/Components/PanicButton'
import Button from 'app/Components/Button'
import { images } from 'app/Theme'

import styles from './style'

export default class Help extends Component {
  triggerReport = () => {
    this.props.navigator.push({
      screen: 'temis.report',
      title: I18n.t('screens.report.title')
    })
  }

  render() {
    return (
      <DefaultLayout>
        <PanicButton />
        <View style={styles.textContainer}>
          <Text style={styles.descText}>
            {I18n.t('screens.help.instructions')}
          </Text>
          <Text style={styles.descText}>
            {I18n.t('screens.help.reportNote')}
          </Text>
        </View>
        <Button
          onPress={this.triggerReport}
          text={I18n.t('screens.help.reportButton')}
        />
      </DefaultLayout>
    )
  }
}
