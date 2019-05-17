<template>
  <div>
    <div class="form-block">
      <div class="input-block">
        <div class="icon-box">
          <img class="icon" mode="aspectFit" src="../../../assets/images/login/mobile.png" alt>
        </div>
        <input class="input" v-model="mobile" type="number" placeholder="请输入手机号码">
        <img mode="aspectFit" src="../../../assets/images/login/close.png" alt @click="mobile=''" class="close">
      </div>
      <div class="input-block">
        <div class="icon-box">
          <img class="icon code" mode="aspectFit" src="../../../assets/images/login/yzm.png" alt>
        </div>
        <input class="input" v-model="code" type="number" :maxlength="6" placeholder="请输入6位数字验证码">
        <button class="get-code" :class="codeDisabled?'disabled' : ''" @click="getCode" :disabled="codeDisabled">{{getCodeText}}</button>
      </div>
    </div>
    <div class="form-submit">
      <div class="wx-code">
        <div class="copy" @click="copyWxCode">一键复制</div>
        收不到验证码？请加微信 {{wxTel}}
      </div>
      <button class="submit" :class="submitLoading?'disabled' : ''" @click="submit" :disabled="submitLoading" :loading="submitLoading">确定</button>
    </div>
    <div class="wx-login" v-if="isWX">
      <p>使用第三方登录</p>
      <button class="btn" hover-class="none" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        <img class="img" src="../../../assets/images/login/wechat.png" alt>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wxTel: '15911047630',
      isWX: false,
      mobile: '',
      code: '',
      submitLoading: false,
      codeDisabled: false,
      getCodeText: '获取验证码',
      interval: 10,
      timmer: null
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    if (mpvuePlatform === 'wx') {
      this.isWX = true
    }
  },
  onUnload() {
    clearTimeout(this.timmer)
  },
  beforeDestroy() {
    clearTimeout(this.timmer)
  },
  methods: {
    submit() {
      if (!this.checkMobile()) {
        return false
      }
      if (this.code == '') {
        this.$utils.showError('验证码不能为空')
        return false
      }
      let parm = {
        shoujihao: this.mobile,
        yzm: this.code
      }
      this.$http.post('logincd', parm).then(res => {
        // console.log(res)
        if (res.ret === 0) {
          // this.$emit('loginSuess', res)
        }
        this.$emit('login-suess', res)
      })
      // console.log(parm)
    },

    getCode() {
      if (!this.checkMobile()) {
        return false
      }
      this.codeDisabled = true
      this.interval = 60

      this.$http.post('codes', { shoujihao: this.mobile }).then(res => {
        // console.log(res)
        this.runInterval()
      })
    },
    runInterval() {
      if (this.interval <= 1) {
        this.getCodeText = '获取验证码'
        this.codeDisabled = false
      } else {
        this.interval--
        this.getCodeText = `重新获取(${this.interval})`
        this.timmer = setTimeout(() => {
          this.runInterval()
        }, 1000)
      }
    },
    checkMobile() {
      if (this.mobile == '') {
        this.$utils.showError('手机号不能为空')
        return false
      }
      if (!this.$utils.checkMobile(this.mobile)) {
        this.$utils.showError('手机号格式不正确')
        return false
      }
      return true
    },
    getPhoneNumber(e) {
      console.log(e)
      let d = e.mp.detail
      this.$emit('get-phone', d)
    },
    copyWxCode() {
      if (mpvuePlatform === 'my') {
        mpvue.setClipboard({
          text: this.this.wxTel,
          success(res) {
            // console.log(res)
          }
        })
      } else {
        mpvue.setClipboardData({
          data: this.wxTel,
          success(res) {
            // mpvue.getClipboardData({
            //   success(res) {
            //     console.log(res.data) // data
            //   }
            // })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.wx-login {
  text-align: center;
  font-size: 26rpx;
  color: #8e8e8e;
  .btn {
    display: inline;
    // width: 80rpx;
    // height: 80rpx;
  }
  .img {
    margin-top: 10rpx;
    width: 80rpx;
    height: 80rpx;
  }
}

.form-submit {
  padding: 20rpx 20rpx 170rpx 80rpx;
  .wx-code {
    font-size: 24rpx;
    color: #8e8e8e;
    .copy {
      float: right;
    }
    padding-bottom: 40rpx;
  }
  .submit {
    background: $primary;
    border-radius: 5rpx;
    color: #fff;
    font-size: 28rpx;
    margin-right: 60rpx;
  }
}

.form-block {
  background-color: #fff;
  .input-block {
    display: flex;
    margin: 0 20rpx;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #dedede;
    &:last-child {
      border-bottom: none;
    }
    .input {
      flex: 1;
      padding-left: 20rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      height: 70rpx;
    }
    .get-code {
      min-width: 185rpx;
      height: 60rpx;
      margin-top: 5rpx;
      line-height: 60rpx;
      border-radius: 5rpx;
      background-color: $primary;
      color: #fff;
      padding: 0 20rpx;
      font-size: 24rpx;
    }
    .icon-box {
      width: 60rpx;
      height: 70rpx;
      display: flex;
      align-items: center;
    }
    .icon {
      width: 30rpx;
      height: 48rpx;
    }
    .code {
      width: 42rpx;
      height: 32rpx;
    }
    .close {
      width: 30rpx;
      height: 30rpx;
      margin-top: 10rpx;
    }
  }
}
</style>

