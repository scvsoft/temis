import { create } from 'apisauce'
import Config from 'app/Config/Settings'

const backendApi = create({
  baseURL: Config.backendURL
})

backendApi.addRequestTransform(request => {
  if (request.data._auth) {
    request.headers['x-auth-token'] = request.data._auth
    delete request.data._auth
  }
})

export const loginUser = access_token =>
  new Promise((resolve, reject) => {
    backendApi
      .post('authentication/facebook', {
        access_token
      })
      .then(response => {
        response.ok
          ? resolve({
              user: response.data,
              firstTime: response.status === 201,
              auth: response.headers['x-auth-token']
            })
          : reject(response.problem)
      })
  })

export const updateUser = newData =>
  backendApi.put(`users/${newData.id}`, newData)
