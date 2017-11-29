import React, { Component } from 'react'
import { View, Text, Switch } from 'react-native'

import { goHome } from 'app/Api/Navigation'
import I18n from 'app/Locales'

import DefaultLayout from 'app/Layouts/Default'
import FormBox from 'app/Components/FormBox'
import {
  FlagInput,
  GenTextInput,
  PickerInput,
  DatePickerInput
} from 'app/Components/Inputs'
import Button from 'app/Components/Button'

import styles from './style'

export default class Profile extends Component {
  render() {
    return (
      <DefaultLayout>
        <FormBox>
          <GenTextInput label={I18n.t('screens.profile.label.name')} />
          <View>
            <DatePickerInput label={I18n.t('screens.profile.label.birthday')} />
            <PickerInput label={I18n.t('screens.profile.label.gender')} />
          </View>
          <View>
            <FlagInput
              label={I18n.t('screens.profile.label.anon')}
              value={true}
            />
            <Text style={styles.description}>
              {I18n.t('screens.profile.description')}
            </Text>
          </View>
        </FormBox>
        <Button
          onPress={() => {
            this.props.navigator.dismissModal()
          }}
          text={I18n.t('screens.profile.button')}
        />
      </DefaultLayout>
    )
  }
}
