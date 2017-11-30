import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import I18n from 'app/Locales'
import ReportActions from 'app/Redux/Report'
import DefaultLayout from 'app/Layouts/Default'
import PanicButton from 'app/Components/PanicButton'
import Button from 'app/Components/Button'
import { images } from 'app/Theme'

import styles from './style'

class Help extends Component {
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
          onPress={this.props.report}
          text={I18n.t('screens.help.reportButton')}
        />
      </DefaultLayout>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = ReportActions

export default connect(mapStateToProps, mapDispatchToProps)(Help)
