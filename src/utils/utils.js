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
export { showError }
