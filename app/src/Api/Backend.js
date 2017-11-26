import { create } from 'apisauce'
import Config from 'app/Config/Settings'

const backendApi = create({
  baseURL: Config.backendURL
})

export const loginUser = access_token =>
  new Promise((resolve, reject) => {
    backendApi
      .post('authentication/facebook', {
        access_token
      })
      .then(response => {
        response.ok ? resolve(response.data) : reject(response.problem)
      })
  })
