import React, { Component } from 'react'
import DefaultLayout from 'app/Layouts/Default'
import I18n from 'app/Locales'
import FormBox from 'app/Components/FormBox'
import { GenTextInput, FlagInput } from 'app/Components/Inputs'
import Button from 'app/Components/Button'

export default class Report extends Component {
  render() {
    return (
      <DefaultLayout scrollable={true}>
        <FormBox>
          <GenTextInput
            label={I18n.t('screens.report.label.description')}
            multiline={true}
          />
          <FlagInput label={I18n.t('screens.report.label.anon')} />
        </FormBox>
        <Button text={I18n.t('screens.report.button')} />
      </DefaultLayout>
    )
  }
}
