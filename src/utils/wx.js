function wxLogin() {
  return new Promise((resolve, reject) => {
    mpvue.login({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export { wxLogin }
