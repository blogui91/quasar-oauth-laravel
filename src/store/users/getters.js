import _ from 'lodash'
export const roles = (state) => {
  const user = state.currentUser
  if (user) {
    user.roles.push(user.role)
    return user.roles
  }
  return []
}

export const permissions = (state) => {
  return _.groupBy(_.uniqBy(_.flatten(roles(state).map(role => role.permissions)), 'key'), 'table_name')
}
