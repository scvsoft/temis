import React, { Component } from 'react'
import { View, Image } from 'react-native'
import Spinner from 'app/Components/Spinner'
import { images } from 'app/Theme'

import styles from './style'

export default class DefaultLayout extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.background} source={images.background} />
        {this.props.children}
        <Spinner visible={this.props.loading} />
      </View>
    )
  }
}

DefaultLayout.defaultProps = {
  style: {},
  loading: false
}
