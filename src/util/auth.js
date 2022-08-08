import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'

export const getTOKEN = () => storage.get(TOKEN)

export const setTOKEN = (value) => storage.set(TOKEN, value)

export const removeTOKEN = () => storage.remove(TOKEN)

const HISTORY = 'TT_HISTORY'

export const getHISTORY = () => storage.get(HISTORY)

export const setHISTORY = (value) => storage.set(HISTORY, value)

export const removeHISTORY = () => storage.remove(HISTORY)
