import moment from 'moment'
import 'moment/min/locales.min'
import I18n from 'react-native-i18n'
import en from './en'
import es from './es'
import Locale from 'react-native-locale'

I18n.fallbacks = 'true'

I18n.translations = {
  en,
  es
}

const getLanguage = localeOpts => {
  if (
    localeOpts.preferredLanguages &&
    localeOpts.preferredLanguages.length > 0
  ) {
    return localeOpts.preferredLanguages[0]
  }
  if (localeOpts.localeIdentifier)
    return localeOpts.localeIdentifier.split('_')[0]
  return 'en'
}

moment.locale(getLanguage(Locale.constants()))

export default I18n
