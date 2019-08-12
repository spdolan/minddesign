import localforage from 'localforage'

export default class CacheManager {

  writeData = (key, data) => localforage.setItem(key, data)

  readData = key => localforage.getItem(key)

  removeData = key => localforage.removeItem(key)

  clear = () => localforage.clear()
}
