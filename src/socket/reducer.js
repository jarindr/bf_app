import createReducer from '../reducer/createReducer'
import _ from 'lodash'

export const socketReducer = createReducer(
  '',
  {
    'SOCKET/STATUS': (state, { data }) => data
  }
)
