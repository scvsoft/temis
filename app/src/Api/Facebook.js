import { FBLoginManager } from 'react-native-facebook-login'

export const login = () =>
  new Promise((resolve, reject) => {
    FBLoginManager.loginWithPermissions(['email'], (error, data) => {
      if (!error && data && data.credentials) {
        resolve(data.credentials)
      } else {
        const cause =
          error === 'Cancel' ||
          (typeof error === 'object' && error.type === 'cancel')
            ? 'Cancel'
            : error
        reject(cause)
      }
    })
  })
