<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log() {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
page {
  background: #f5f5f5;
  font-size: 28rpx;
  color: #333;
}
button,
button::after {
  padding: 0;
  border: none;
  border-radius: 0;
}
button.disabled {
  background: #999 !important;
}
.clearfix:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  content: '';
}

.clearfix {
  zoom: 1;
}
</style>
