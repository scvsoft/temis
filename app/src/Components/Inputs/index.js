import React, { Component } from 'react'
import { View, Text, Switch, TextInput } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import DatePicker from 'react-native-datepicker'
import I18n from 'app/Locales'
import styles, { datePickerInner } from './style'
import { colors, images } from 'app/Theme'

export default class InputBox extends Component {
  render() {
    return (
      <View style={styles.inputBox}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.children}
      </View>
    )
  }
}

export class InlineInputBox extends Component {
  render() {
    return (
      <View style={styles.inlineInputBox}>
        <Text style={styles.inlineLabel}>{this.props.label}</Text>
        {this.props.children}
      </View>
    )
  }
}

export class FlagInput extends Component {
  render() {
    return (
      <InlineInputBox label={this.props.label}>
        <Switch
          onTintColor={colors.mainLighter}
          thumbTintColor={colors.main}
          {...this.props}
        />
      </InlineInputBox>
    )
  }
}

export class GenTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = { focused: false }
  }

  onFocus = () => {
    this.setState({ focused: true })
  }
  onBlur = () => {
    this.setState({ focused: false })
  }

  render() {
    const borderColor = this.state.focused ? colors.accent : colors.light
    return (
      <InputBox label={this.props.label}>
        <TextInput
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={[styles.textInput, { borderColor }]}
          underlineColorAndroid="transparent"
          selectionColor={colors.accent}
          {...this.props}
        />
      </InputBox>
    )
  }
}

export class PickerInput extends Component {
  render() {
    return (
      <Dropdown
        containerStyle={styles.inputBox}
        style={styles.picker}
        label={this.props.label}
        labelHeight={14}
        data={[
          { value: 'Male' },
          { value: 'Female' },
          { value: 'Other' },
          { value: 'Prefer not to say' }
        ]}
      />
    )
  }
}

export class DatePickerInput extends Component {
  render() {
    return (
      <InputBox label={this.props.label}>
        <DatePicker
          format="LL"
          iconSource={images['icon.calendar']}
          style={styles.datePicker}
          customStyles={datePickerInner}
          confirmBtnText={I18n.t('label.confirm')}
          cancelBtnText={I18n.t('label.cancel')}
        />
      </InputBox>
    )
  }
}
