export const isSnapshot = message => Array.isArray(message[1])
export const isUpdate = message => Array.isArray(message[1][0])
