import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import I18n from 'app/Locales'
import ReportActions from 'app/Redux/Report'
import PanicButton from 'app/Components/PanicButton'
import Button from 'app/Components/Button'
import { images } from 'app/Theme'

import styles from './style'

class Help extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={images.background} />
        <PanicButton />
        <View style={styles.textContainer}>
          <Text style={styles.descText}>
            {I18n.t('screens.help.instructions')}
            Reports: {this.props.count}
          </Text>
          <Text style={styles.descText}>
            {I18n.t('screens.help.reportNote')}
          </Text>
        </View>
        <Button
          onPress={this.props.report}
          text={I18n.t('screens.help.reportButton')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => state.report

const mapDispatchToProps = ReportActions

export default connect(mapStateToProps, mapDispatchToProps)(Help)
