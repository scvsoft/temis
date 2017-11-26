import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { images } from 'app/Theme'

import styles from './style'

export default class DefaultLayout extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Spinner visible={this.props.loading} />
        <Image style={styles.background} source={images.background} />
        {this.props.children}
      </View>
    )
  }
}

DefaultLayout.defaultProps = {
  style: {},
  loading: false
}
