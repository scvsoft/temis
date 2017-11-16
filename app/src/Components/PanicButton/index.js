import React, { Component } from 'react'
import Button from 'app/Components/Button'
import I18n from 'app/Locales'
import styles from './style'

export default class PanicButton extends Component {
  render() {
    return (
      <Button
        buttonStyle={styles.button}
        textStyle={styles.text}
        text={I18n.t('panicButton.text')}
      />
    )
  }
}
