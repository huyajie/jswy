<template>
  <div class="login-type">
    <div class="wx">
      <button class="btn-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        <img class="img" src="../../../assets/images/login/wechat2.png" alt>
        &nbsp;微信用户快捷登录
      </button>
      <!-- <div class="hr">
        <span class="span">或者</span>
      </div>-->
    </div>
    <!-- <div class="phone">
      <button class="btn-phone mobile" @click="byTel">
        <img class="img" src="../../../assets/images/login/shouji.png" alt>
        &nbsp;手机号码登录/注册
      </button>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {},
  onLoad() {
    // console.log(Auth.getToken())
    // console.log(Auth.getInfo())
    // Auth.remove()
  },
  methods: {
    byTel() {
      this.$emit('login-bytel')
    },
    getPhoneNumber(e) {
      console.log(e)
      let d = e.mp.detail
      this.$emit('get-phone', d)
      /*if (d.errMsg === 'getPhoneNumber:ok') {
        wxLogin().then(res => {
          let parm = {
            edata: d.encryptedData,
            iv: d.iv,
            code: res.code
          }
          this.wxLoginEvent(parm)
        })
      }*/
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.login-type {
  padding: 100rpx 75rpx 0;
  .btn-phone {
    background: $primary;
    height: 75rpx;
    line-height: 75rpx;
    border-radius: 10rpx;
    font-size: 30rpx;
    color: #fff;
    .img {
      width: 60rpx;
      height: 44rpx;
      vertical-align: middle;
    }
  }
  .wx {
    .hr {
      height: 0rpx;
      border-top: 1rpx solid #d9d9d9;
      margin: 80rpx auto;
      position: relative;
      .span {
        position: absolute;
        width: 70rpx;
        text-align: center;
        background-color: #f5f5f5;
        font-size: 28rpx;
        color: #666;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

