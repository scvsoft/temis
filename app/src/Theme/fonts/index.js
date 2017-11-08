import fontOverrides from './platformFonts'
import { mergeDeepRight } from 'ramda'

const genericFonts = {
  text: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16
  },
  detail: {
    fontWeight: '400',
    fontSize: 12
  },
  subscript: {
    fontWeight: '400',
    fontSize: 10
  },
  emphasis: {
    fontWeight: '700',
    fontSize: 14
  },
  huge: {
    fontWeight: '900',
    fontSize: 62
  },
  h1: {
    fontWeight: '700',
    fontSize: 34
  },
  h2: {
    fontWeight: '600',
    fontSize: 20
  }
}

export default mergeDeepRight(genericFonts, fontOverrides)
