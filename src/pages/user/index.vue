<template>
  <div>
    <user-info :user-info="userInfo"></user-info>
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
      userInfo: {}
    }
  },
  onShow() {
    // Auth.checkLogin('redirect')
    // if (!Auth.getWxInfo()) {
    //   this.showModal = true
    // }
    if (Auth.checkLogin()) {
      this.getSeverInfo()
    }
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
      console.log(d)
    },
    getSeverInfo() {
      let mobile = Auth.getInfo('shoujihao')
      this.$http.get('myInfo').then(res => {
        console.log(res)
        if (res.ret === 0 && res.data.userinfo) {
          let tmpObj = res.data.userinfo[0]
          tmpObj.mobile = mobile
          this.userInfo = tmpObj
          console.log(!this.userInfo.photo)
          if (!this.userInfo.photo) {
            this.setInfo()
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
