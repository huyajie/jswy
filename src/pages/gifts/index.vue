<template>
  <div class="gift">
    <div>
      <img class="banner" mode="aspectFit" src="../../assets/images/invite/mianfeiling01.png" alt />
    </div>
    <div>
      <img class="git-img" mode="aspectFit" src="../../assets/images/invite/mianfeiling02.png" alt />
    </div>
    <button class="submit-btn" @click="submit">
      <img class="btn-img" mode="aspectFit" src="../../assets/images/invite/mianfeiling03.png" alt />
    </button>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'

export default {
  data() {
    return {
      query: {}
    }
  },
  components: {},
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.query = this.$root.$mp.query
    console.log(this.query)
  },
  methods: {
    submit() {
      if (!Auth.checkLogin()) {
        return false
      }
      let parms = {
        apiKey: '51baomu',
        version: '1.0',
        clientId: '111',
        reqId: '1',
        reqTime: '1561538290018',
        dataType: 'json',
        data: {
          chongzhika_huodong_id: this.query.id,
          shoujihao: this.query.mobile,
          guanggaozuid: '0',
          laiyuan: '家事无忧微信小程序'
        },
        sign: '1',
        token: 'login'
      }
      console.log(parms)
      this.$http
        .post('https://www.51baomu.cn/wcfyonghu/appdatacustomer.svc/i_p_chongzhika_huodong', JSON.stringify(parms), {
          'content-type': 'application/x-www-form-urlencoded'
        })
        .then(res => {
          console.log(res)
          if (res.status === 0) {
            this.$router.navigateTo({
              url: '/pages/giftState/main?type=1'
            })
          } else {
            this.$utils.showError(res.message)
          }
        })
      // this.$router.navigateTo({
      //   url: '/pages/giftState/main?type=1'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.gift {
  min-height: 100vh;
  background: #fa482a;
  .banner {
    width: 750rpx;
    height: 600rpx;
  }
  .git-img {
    display: block;
    width: 670rpx;
    height: 224rpx;
    margin: 0 auto;
  }
  .submit-btn {
    display: block;
    margin: 40rpx auto 0;
    width: 481rpx;
    height: 120rpx;
    background: transparent;
    .btn-img {
      width: 481rpx;
      height: 120rpx;
    }
  }
}
</style>

