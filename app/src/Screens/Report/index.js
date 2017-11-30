import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReportActions from 'app/Redux/Report'
import DefaultLayout from 'app/Layouts/Default'
import I18n from 'app/Locales'
import FormBox from 'app/Components/FormBox'
import { GenTextInput, FlagInput } from 'app/Components/Inputs'
import Button from 'app/Components/Button'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      anonymous: this.props.anonymous
    }
  }
  render() {
    const { description, anonymous } = this.state
    return (
      <DefaultLayout scrollable={true}>
        <FormBox>
          <GenTextInput
            value={description}
            onChangeText={description => this.setState({ description })}
            label={I18n.t('screens.report.label.description')}
            multiline={true}
          />
          <FlagInput
            value={anonymous}
            onValueChange={anonymous => this.setState({ anonymous })}
            label={I18n.t('screens.report.label.anon')}
          />
        </FormBox>
        <Button
          onPress={() => {
            this.props.submit(this.state)
            this.props.navigator.pop()
          }}
          text={I18n.t('screens.report.button')}
        />
      </DefaultLayout>
    )
  }
}

const mapStateToProps = state => ({
  anonymous: state.user.data.anonymous
})

const mapDispatchToProps = {
  submit: ReportActions.report
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
