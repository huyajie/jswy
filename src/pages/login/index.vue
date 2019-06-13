<template>
  <div>
    <!-- <phone-login></phone-login> -->
    <div v-show="checkType">
      <banner :bannerList="bannerList"></banner>
      <select-login @get-phone="getPhone" @login-bytel="onLogingBytel"></select-login>
    </div>
    <phone-login v-if="!checkType" @get-phone="getPhone" @login-suess="onPhoneLogin"></phone-login>
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
      checkType: true, //默认页面展示 选择登录方式的按钮
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
    if (this.query.redirect) {
      this.query.redirect = decodeURIComponent(this.query.redirect)
    }
    //不是微信的时候 直接调用手机号登录
    if (mpvuePlatform !== 'wx') {
      this.checkType = false
    }
  },
  methods: {
    //切换页面
    onLogingBytel() {
      this.checkType = false
      console.log(1)
    },
    //手机号密码登录成功回调
    onPhoneLogin(res) {
      console.log(res)
      if (res.ret === 0) {
        Auth.setInfo(res.data)
        Auth.setToken(res.data.token)
        this.loginSuccess()
      } else if (res.msg) {
        this.$utils.showError(res.msg)
      } else {
        this.$utils.showError('数据异常，请稍后重试')
      }
    },
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
          this.$utils.showError('数据异常，请稍后重试')
        }
      })
    },
    loginSuccess() {
      let _this = this
      if (this.query.type === 'back') {
        this.$router.navigateBack({
          delta: 1
        })
      } else if (this.query.type === 'redirect') {
        console.log(this.query.redirect)
        this.$router.redirectTo({
          url: this.query.redirect,
          fail(e) {
            if (e.errMsg == 'redirectTo:fail can not redirectTo a tabbar page') {
              _this.$router.switchTab({
                url: _this.query.redirect
              })
            }
            console.log(e)
          }
        })
      } else if (this.query.type === 'navigate') {
        this.$router.navigateTo({
          url: this.query.redirect
        })
      } else {
        this.$router.switchTab({
          url: '/pages/index/main'
        })
      }
    }
  }
}
</script>

<style>
</style>
