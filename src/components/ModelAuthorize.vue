<template>
  <div class="model-authorize">
    <div class="zhezhao"></div>
    <div class="authorize">
      <div class="authorize-title">提示</div>
      <div class="authorize-desc">请完成微信授权后继续使用哦～</div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo" class="authorize-btn">获取微信授权</button>
      <!-- <button open-type="getPhoneNumber" lang="zh_CN" bindgetphonenumber="getUserInfo" class="authorize-btn">获取微信授权</button> -->
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'

export default {
  methods: {
    getUserInfo(e) {
      console.log(e)
      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        Auth.setWxInfo(e.mp.detail.userInfo)
        this.$emit('getinfo', e.mp.detail.userInfo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.zhezhao {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.4;
}

.authorize {
  width: 520rpx;
  height: 376rpx;
  background: #fff;
  border-radius: 8rpx;
  position: absolute;
  z-index: 1000;

  top: 50%;
  left: 50%;
  margin: -188rpx 0 0 -260rpx;
}
.authorize-title,
.authorize-desc {
  text-align: center;
  color: #1c1c2c;
}
.authorize-title {
  font-size: 35rpx;
  height: 42rpx;
  line-height: 42rpx;
  margin-top: 40rpx;
}
.authorize-desc {
  font-size: 28rpx;
  height: 36rpx;
  text-align: center;
  line-height: 36rpx;
  margin: 50rpx 0 62rpx 0;
}
.authorize-btn {
  width: 372rpx;
  height: 80rpx;
  background: $primary;
  font-size: 28rpx;
  color: #fff;
  line-height: 80rpx;
  border-radius: 8rpx;
}
</style>

