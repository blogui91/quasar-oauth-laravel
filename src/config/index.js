import { findValue } from 'src/utils'
import api from './api'
import auth from './auth'
import database from './database'
// import newconfig from './newconfigfile'

export default function (value = '', fallback = null) {
  const values = {
    api,
    auth,
    database
    // newconfig
  }
  return findValue(value, values) || fallback
}
