import { setStorageSync, getStorageSync, removeStorageSync, getCurrentUrl } from './utils.js'
import { navigateTo, redirectTo } from './route.js'
import dayjs from 'dayjs'
const TOKEN = 'TOKEN'
const INFO = 'USER_INFO'
const WX_INFO = 'WX_USER_INFO'
const Auth = {
  setToken(val) {
    setStorageSync(TOKEN, val)
  },
  getToken() {
    return getStorageSync(TOKEN)
  },
  setInfo(val) {
    setStorageSync(INFO, val)
  },
  setWxInfo(val) {
    setStorageSync(WX_INFO, val)
  },
  getWxInfo(type) {
    let userInfo = getStorageSync(WX_INFO)
    if (type && userInfo) {
      return userInfo[type]
    }
    return userInfo
  },
  getInfo(type) {
    let userInfo = getStorageSync(INFO)
    if (type && userInfo) {
      return userInfo[type]
    }
    return userInfo
  },
  remove() {
    removeStorageSync(TOKEN)
    removeStorageSync(INFO)
  },
  checkLogin(type) {
    let expiry = this.getInfo('expiry')
    // console.log(dayjs.unix(expiry).format('YYYY-MM-DD HH:mm:ss'))
    // console.log(page)
    // console.log()

    if (expiry && dayjs().isBefore(dayjs.unix(expiry))) {
      return true
    } else {
      this.remove()
      let url = encodeURIComponent(getCurrentUrl())
      if (type === 'redirect') {
        redirectTo({
          url: `/pages/login/main?redirect=/${url}&type=redirect`
        })
      } else {
        navigateTo({
          url: `/pages/login/main`
        })
      }
      return false
    }
  }
}

export default Auth
