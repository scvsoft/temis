function isMergeableObject(val) {
  var nonNullObject = val && typeof val === 'object'

  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== '[object RegExp]' &&
    Object.prototype.toString.call(val) !== '[object Date]'
  )
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
  var clone = optionsArgument && optionsArgument.clone === true
  return clone && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, optionsArgument)
    : value
}

function defaultArrayMerge(target, source, optionsArgument) {
  var destination = target.slice()
  source.forEach(function(e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument)
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}

function mergeObject(target, source, optionsArgument) {
  var destination = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function(key) {
      destination[key] = cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach(function(key) {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument)
    }
  })
  return destination
}

function deepmerge(target, source, optionsArgument) {
  var array = Array.isArray(source)
  var options = optionsArgument || { arrayMerge: defaultArrayMerge }
  var arrayMerge = options.arrayMerge || defaultArrayMerge

  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument)
  } else {
    return mergeObject(target, source, optionsArgument)
  }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error(
      'first argument should be an array with at least two elements'
    )
  }

  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, optionsArgument)
  })
}

const dotenv = require('dotenv').config()

let config = {}
//let obj, o = obj = {};

const a = {}
a['FACEBOOK_CLIENTID'] = 'XXX'
a['FACEBOOK_CLIENTSECRET'] = 'XXX'

console.log(a)
//for (key in process.env) {
for (key in a) {
  config = deepmerge(
    key
      .toLowerCase()
      .split('_')
      .reverse()
      .reduce((acc, key) => ((o = {}), (o[key] = acc), o), a[key]), //process.env[key]),
    config
  )
}

console.log('m1', config)
console.log('m2', config.facebook)
console.log('m3', config.facebook.clientId)
/*const config = {
  production: {
    facebook: {
      clientID: 'XXX',
      clientSecret: 'XXX'
    },
    jwt: {
      secret: 'XXX',
      expiration: 60 * 120 // in seconds
    }
  },
  default: {
    facebook: {
      clientID: '128732717834556',
      clientSecret: 'fada2088cc5fcf83788c16285d3a535c'
    },
    jwt: {
      secret: 'f444WXmFIVxxbo3MvQndRGZ5',
      expiration: 60 * 120 // in seconds
    }
  }
}
*/
//export default env => config[env] || config.default
