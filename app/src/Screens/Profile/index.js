import React, { Component } from 'react'

import { goHome } from 'app/Api/Navigation'

import DefaultLayout from 'app/Layouts/Default'
import Button from 'app/Components/Button'

export default class Profile extends Component {
  render() {
    return (
      <DefaultLayout>
        <Button
          onPress={() => {
            console.tron.log(this.props)
            this.props.navigator.dismissModal()
          }}
          text="GO ON"
        />
      </DefaultLayout>
    )
  }
}
