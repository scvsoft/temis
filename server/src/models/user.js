// TODO: Replace by a persistent model (https://github.com/scvsoft/temis/issues/11)

let users = []

export default {
  get: id => users[id],
  put: (id, user) => {
    users[id] = user
  },
  clear: () => (users = [])
}
