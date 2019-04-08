let requestTimmer = null
function showLoaing() {
  clearTimeout(requestTimmer)
  requestTimmer = setTimeout(() => {
    // console.log(1)
    mpvue.showLoading({
      title: '加载中',
      content: '加载中'
    })
  }, 200)
}
function hideLoading() {
  clearTimeout(requestTimmer)
  mpvue.hideLoading()
}
function get(url, data, header) {
  return all({ url, data, header, method: 'GET' })
}

function post(url, data, header) {
  return all({ url, data, header, method: 'POST' })
}

function all(opt) {
  let wholeUrl = `${config.domain}${opt.url}`
  let authHeader = opt.header || { 'Content-Type': 'application/json;charset=UTF-8' }
  let auth = mpvue.getStorageSync('token')
  if (auth) authHeader.token = auth
  showLoaing()
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: wholeUrl,
      header: authHeader,
      data: opt.data,
      method: opt.method,
      success: res => {
        hideLoading()
        // console.log(res.data.code)
        resolve(res.data)
      },
      fail: err => {
        hideLoading()
        reject(err)
      }
    })
  })
}
let config = {
  // domain: '10.6.0.82:8484/', daman.imsupercard.com
  domain: 'https://jzapi.51baomu.cn/'
  // protocol: 'https'
}

// export
function request(opt) {
  return all(opt)
}
request.get = get
request.post = post
export default request