<template>
  <div class="wrap">
    <div class="fail-cont">
      <img class="img" mode="aspectFit" src="../../../assets/images/invite/mianfeiling04.png" alt>
      <p>此活动仅针对新用户！</p>
    </div>
    <div class="gray"></div>
    <div class="invite">
      <p>您可以通过邀请好友获取奖励</p>
      <img class="img" @click="goInvite" mode="aspectFit" src="../../../assets/images/invite/mianfeiling05.png" alt>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goInvite() {
      this.$router.switchTab({
        url: '/pages/user/main'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background-color: #fff;
  .gray {
    height: 10rpx;
    background: #f5f5f5;
  }
}
.invite {
  text-align: center;
  padding: 50rpx;
  font-size: 35rpx;
  .img {
    margin-top: 35rpx;
    width: 640rpx;
    height: 512rpx;
  }
}
.fail-cont {
  padding: 50rpx;
  text-align: center;

  .img {
    width: 120rpx;
    height: 120rpx;
    font-size: 30rpx;
  }
}
</style>

