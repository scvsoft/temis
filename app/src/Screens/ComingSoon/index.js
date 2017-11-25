import React, { Component } from 'react'
import { Text } from 'react-native'

import DefaultLayout from 'app/Layouts/Default'
import styles from './style'

export default class ComingSoon extends Component {
  render() {
    return (
      <DefaultLayout>
        <Text style={styles.buttonDesc}>COMING SOON</Text>
      </DefaultLayout>
    )
  }
}
