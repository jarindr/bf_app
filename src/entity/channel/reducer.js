import createReducer from '../../reducer/createReducer'
export const channelReducer = createReducer(
  {},
  {
    'SOCKET_MESSAGE/SUBSCRIBED/RECEIVE': (state, {data}) => {
      return { ...state, [data.chanId]: data }
    }
  }
)
