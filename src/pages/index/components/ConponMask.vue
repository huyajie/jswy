<template>
  <div v-if="showConpon" @touchmove.stop="move">
    <div class="mask"></div>
    <div class="conpon">
      <div class="close" @click="hideConpon"></div>
      <img class="img" src="../../../assets/images/home/coupon.jpg" alt>
      <div class="btn" @click="goConpon"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConpon: true
    }
  },
  methods: {
    move() {},
    goConpon() {
      this.hideConpon()
      this.$router.navigateTo({
        url: `/pages/webview/main?src=${encodeURIComponent('https://m.51baomu.cn/xiaochengxu/200youhui/')}`
      })

      //
    },
    hideConpon() {
      this.showConpon = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
}
.conpon {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
  height: 502rpx;
  .close {
    position: absolute;
    top: -10rpx;
    right: 35rpx;
    width: 60rpx;
    height: 60rpx;
  }
  .btn {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 290rpx;
    height: 85rpx;
    transform: translate(-50%, 0);
  }
  .img {
    width: 600rpx;
    height: 502rpx;
  }
}
</style>

