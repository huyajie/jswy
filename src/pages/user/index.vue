<template>
  <div>
    <user-info :user-info="userInfo" :is-login="isLogin"></user-info>
    <model-authorize v-if="showModal" @getinfo="getUserInfo"></model-authorize>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
import ModelAuthorize from '../../components/ModelAuthorize.vue'
import Auth from '@/utils/auth.js'

export default {
  data() {
    return {
      showModal: false,
      hasInfo: false,
      userInfo: {},
      isLogin: false,
      getInfoSucess: false
    }
  },
  onShow() {
    // Auth.checkLogin('redirect')
    // if (!Auth.getWxInfo()) {
    //   this.showModal = true
    // }
    this.isLogin = Auth.isLogin()
    if (this.isLogin && !this.getInfoSucess) {
      this.getSeverInfo()
    }
  },
  onLoad() {
    Auth.checkLogin()
  },
  methods: {
    setInfo() {
      if (this.hasInfo) return false
      let info = Auth.getWxInfo()
      if (info) {
        this.getUserInfo(info)
      } else {
        this.showModal = true
      }
    },
    getUserInfo(d) {
      this.showModal = false
      let parm = {
        type: 'photonick',
        photo: d.avatarUrl,
        // photo: '',
        nikename: d.nickName
        // nikename: ''
      }
      this.$http.post('userInfo', parm).then(res => {
        if (res.ret === 0) {
          this.hasInfo = true
          this.getSeverInfo()
        }
      })
      // console.log(d)
    },
    getSeverInfo() {
      let mobile = Auth.getInfo('shoujihao')
      this.$http.get('myInfo').then(res => {
        console.log(res)
        if (res.ret === 0 && res.data.userinfo) {
          let tmpObj = res.data.userinfo[0]
          tmpObj.mobile = mobile
          // console.log(!this.userInfo.photo)
          if (!tmpObj.photo) {
            this.setInfo()
          } else {
            this.userInfo = tmpObj
            this.getInfoSucess = true
          }
        }
      })
    }
  },
  components: {
    UserInfo,
    ModelAuthorize
  }
}
</script>

<style>
</style>
