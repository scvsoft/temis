// TODO: Replace by a persistent model

const users = []

export default {
  get: id => users[id],
  put: (id, user) => {
    users[id] = user
  }
}
