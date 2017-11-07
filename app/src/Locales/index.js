import I18n from 'react-native-i18n'
import en from './en'
import es from './es'

I18n.fallbacks = 'true'

I18n.translations = {
  en,
  es
}

export default I18n
