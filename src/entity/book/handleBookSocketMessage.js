import { isSnapshot } from './helper'
import { batchActions } from 'redux-batched-actions'

class Queue {
  constructor (store) {
    this.store = store
    this.messages = []
  }
  push (action) {
    this.messages.push(action)
  }
  setStore (store) {
    if (!this.store) this.store = store
  }
  init () {
    setInterval(() => {
      if (this.store) {
        this.store.dispatch(batchActions(this.messages))
        this.messages = []
      }
    }, 100)
  }
}

const queue = new Queue()
queue.init()

export const handleBookSocketMesssage = message => store => {
  queue.setStore(store)
  const channelId = message[0]
  if (isSnapshot(message)) {
    if (Array.isArray(message[1][0])) {
      queue.push({
        type: 'SOCKET_MESSAGE/BOOK/RECEIVE_SNAPSHOT',
        data: message[1],
        channel: store.getState().channels[channelId]
      })
    } else {
      queue.push({
        type: 'SOCKET_MESSAGE/BOOK/RECEIVE_UPDATE',
        data: message[1],
        channel: store.getState().channels[channelId]
      })
    }
  }
}
