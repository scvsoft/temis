import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Spinner from 'app/Components/Spinner'
import { images } from 'app/Theme'
import { ScrollView } from 'react-native'

import styles from './style'

export default class DefaultLayout extends Component {
  render() {
    const innerView = (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.background} source={images.background} />
        {this.props.children}
        <Spinner visible={this.props.loading} />
      </View>
    )

    return this.props.scrollable ? (
      <ScrollView contentContainerStyle={styles.scroller}>
        {innerView}
      </ScrollView>
    ) : (
      innerView
    )
  }
}

DefaultLayout.defaultProps = {
  style: {},
  scrollable: false,
  loading: false
}
