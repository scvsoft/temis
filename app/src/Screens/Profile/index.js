import React, { Component } from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'
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
import { GenderEnum } from 'app/Redux/User'

import styles from './style'

class Profile extends Component {
  constructor(props) {
    const defaultState = {
      name: '',
      gender: ' ',
      birthday: null,
      anonymous: true
    }
    super(props)
    this.state = { ...defaultState, ...this.props.user }
  }

  render() {
    console.tron.log(this.state)
    const { name, gender, birthday, anonymous } = this.state
    return (
      <DefaultLayout>
        <FormBox>
          <GenTextInput
            value={name}
            onChangeText={name => this.setState({ name })}
            label={I18n.t('screens.profile.label.name')}
          />
          <View>
            <DatePickerInput
              onChange={birthday => this.setState({ birthday })}
              value={birthday}
              label={I18n.t('screens.profile.label.birthday')}
            />
            <PickerInput
              onChangeText={gender => this.setState({ gender })}
              value={gender}
              data={GenderEnum.map(gender => ({
                value: gender,
                label: I18n.t(`enum.gender.${gender}`)
              }))}
              label={I18n.t('screens.profile.label.gender')}
            />
          </View>
          <View>
            <FlagInput
              onValueChange={anonymous => this.setState({ anonymous })}
              label={I18n.t('screens.profile.label.anon')}
              value={anonymous}
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
