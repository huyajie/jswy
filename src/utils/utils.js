function showError(str) {
  if (mpvuePlatform === 'my') {
    mpvue.alert({
      content: str
    })
  } else {
    mpvue.showModal({
      showCancel: false,
      title: '提示',
      content: str
    })
  }
}
function previewImage(obj) {
  mpvue.previewImage(obj)
}

function setStorageSync(key, value) {
  try {
    mpvue.setStorageSync(key, value)
  } catch (e) {}
}
function getStorageSync(key) {
  let r = ''
  try {
    r = mpvue.getStorageSync(key)
  } catch (e) {}
  return r
}
function removeStorageSync(key) {
  try {
    mpvue.removeStorageSync(key)
  } catch (e) {}
}
function getCurrentUrl() {
  let pages = getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  let url = currentPage.route //当前页面url
  let options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  let urlWithArgs = url + '?'
  for (let key in options) {
    let value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
export { showError, previewImage, setStorageSync, getStorageSync, removeStorageSync, getCurrentUrl }
