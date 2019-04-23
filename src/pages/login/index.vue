<template>
  <div>
    <!-- <phone-login></phone-login> -->
    <banner :bannerList="bannerList"></banner>
    <select-login @get-phone="getPhone"></select-login>
  </div>
</template>

<script>
import Banner from '../index/components/Banner'
import PhoneLogin from './components/PhoneLogin.vue'
import SelectLogin from './components/SelectLogin.vue'
import { wxLogin } from '@/utils/wx.js'
import Auth from '@/utils/auth.js'
export default {
  components: {
    Banner,
    PhoneLogin,
    SelectLogin
  },
  data() {
    return {
      bannerList: ['http://m.51baomu.cn/tupian/jzxiaochengxu/xbanner.png'],
      query: {
        type: 'back',
        redirect: ''
      }
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    // this.query = $mp.query
    console.log($mp)
    Object.assign(this.query, $mp.query)
  },
  methods: {
    //获取你微信手机号 加密信息
    getPhone(d) {
      if (d.errMsg === 'getPhoneNumber:ok') {
        wxLogin().then(res => {
          let parm = {
            edata: d.encryptedData,
            iv: d.iv,
            code: res.code
          }
          this.wxLoginEvent(parm)
        })
      }
    },
    //通过微信手机号 登录code  进行登录
    wxLoginEvent(parm) {
      this.$http.post('loginwx', parm).then(res => {
        console.log(res)
        if (res.ret === 0) {
          Auth.setInfo(res.data)
          Auth.setToken(res.data.token)
          this.loginSuccess()
        } else if (res.msg) {
          this.$utils.showError(res.msg)
        } else {
          this.$utils.showError('网络可能出现问题了，请稍后重试')
        }
      })
    },
    loginSuccess() {
      if (this.query.type === 'back') {
        this.$router.navigateBack({
          delta: 1
        })
      } else if (this.query.type === 'redirect') {
        this.$router.redirectTo({
          url: this.query.redirect
        })
      } else if (this.query.type === 'navigate') {
        this.$router.navigateTo({
          url: this.query.redirect
        })
      } else {
        this.switchTab({
          url: '/pages/index/main'
        })
      }
    }
  }
}
</script>

<style>
</style>
