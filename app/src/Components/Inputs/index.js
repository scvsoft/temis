import React, { Component } from 'react'
import { View, Text, Switch, TextInput } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import DatePicker from 'react-native-datepicker'
import I18n from 'app/Locales'
import styles, { datePickerInner } from './style'
import { colors, images } from 'app/Theme'
import moment from 'moment'

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
        {...this.props}
      />
    )
  }
}

export class DatePickerInput extends Component {
  displayFormat = 'LL'
  valueFormat = 'YYYY-MM-DD'

  formatDate = value =>
    value ? moment(value, this.valueFormat).format(this.displayFormat) : null

  formatValue = date =>
    moment(date, this.displayFormat).format(this.valueFormat)

  render() {
    return (
      <InputBox label={this.props.label}>
        <DatePicker
          format={this.displayFormat}
          iconSource={images['icon.calendar']}
          style={styles.datePicker}
          customStyles={datePickerInner}
          placeholder={' '}
          confirmBtnText={I18n.t('label.confirm')}
          cancelBtnText={I18n.t('label.cancel')}
          date={this.formatDate(this.props.value)}
          onDateChange={date => this.props.onChange(this.formatValue(date))}
        />
      </InputBox>
    )
  }
}
