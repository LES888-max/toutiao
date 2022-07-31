import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'

export const getTOKEN = () => storage.get(TOKEN)

export const setTOKEN = (value) => storage.set(TOKEN, value)

export const removeTOKEN = () => storage.remove(TOKEN)
