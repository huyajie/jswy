<template>
  <div class="new-user">
    <div>
      <img class="banner" mode="aspectFit" src="../../assets/images/new_user/banner.png" alt />
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
      mobile: ''
    }
  },
  components: {},
  methods: {
    submit() {
      if (this.mobile == '') {
        this.$utils.showError('手机号不能为空')
        return false
      }
      if (!this.$utils.checkMobile(this.mobile)) {
        this.$utils.showError('手机号格式不正确')
        return false
      }
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
            if (res.status === 1) {
              mpvue.showModal({
                showCancel: false,
                title: '领取成功',
                content: '使用该手机号登录无忧保姆app查看并使用或签约时告知工作人员即可使用'
              })
            } else {
              this.$utils.showError(res.message)
            }
            // this.$utils.showError(res.message)
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
  background: #e02f3f;
  // background: linear-gradient(#f53a2e, #e02f3f);
  .banner {
    width: 750rpx;
    height: 725rpx;
    display: block;
  }
  .form {
    padding: 50rpx 68rpx;
    text-align: center;
    background: linear-gradient(#f53a2e, #e02f3f);
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
      background: linear-gradient(#faca2a, #f78c2c);
    }
    .desc {
      color: #fff;
    }
  }
}
</style>

