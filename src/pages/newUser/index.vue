<template>
  <div class="new-user">
    <div>
      <img class="banner" mode="aspectFit" src="../../assets/images/invite/mianfeiling01.png" alt />
    </div>
    <div class="form">
      <div class="text">输入手机号，自动存入无忧账户</div>
      <div class="input-block">
        <input class="tel" v-model="mobile" type="number" />
      </div>
      <button :loading="isSubmit" :disabled="isSubmit" @click="submit" class="btn">立即领取</button>
      <div class="desc">抵扣卷用于抵扣服务费</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmit: false,
      mobile: '13512341234'
    }
  },
  components: {},
  methods: {
    submit() {
      this.isSubmit = true
      let parms = {
        apiKey: '51baomu',
        version: '1.0',
        clientId: '111',
        reqId: '1',
        reqTime: '1561538290018',
        dataType: 'json',
        data: {
          chongzhika_huodong_id: '3041',
          shoujihao: this.mobile,
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
        .then(
          res => {
            console.log(res)
            this.isSubmit = false
            // if (res.status === 0) {
            // } else if (res.status == 4) {
            //   this.$utils.showError(res.message)
            // } else {
            //   this.$utils.showError(res.message)
            // }
            this.$utils.showError(res.message)
          },
          err => {
            this.isSubmit = false
          }
        )
      // this.$router.navigateTo({
      //   url: '/pages/giftState/main?type=1'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.new-user {
  min-height: 100vh;
  background: #d42932;
  background: linear-gradient(#f23c2f, #e3313f);
  .banner {
    width: 100%;
  }
  .form {
    padding: 50rpx 68rpx;
    text-align: center;
    .text {
      color: #fde59f;
      font-size: 28rpx;
      padding-bottom: 20rpx;
    }
    .tel {
      display: block;
      height: 84rpx;
      background: #fff;
      border-radius: 8rpx;
    }
    .btn {
      margin: 20rpx 0;
      display: block;
      height: 96rpx;
      color: #753f00;
      background: #fde59f;
      border-radius: 8rpx;
      background: linear-gradient(#fde59f, #f00);
    }
    .desc {
      color: #fff;
    }
  }
}
</style>

