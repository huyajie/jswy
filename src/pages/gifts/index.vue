<template>
  <div class="gift">
    <div>
      <img class="banner" mode="aspectFit" src="../../assets/images/invite/mianfeiling01.png" alt>
    </div>
    <div>
      <img class="git-img" mode="aspectFit" src="../../assets/images/invite/mianfeiling02.png" alt>
    </div>
    <button class="submit-btn" @click="submit">
      <img class="btn-img" mode="aspectFit" src="../../assets/images/invite/mianfeiling03.png" alt>
    </button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    submit() {
      this.$router.navigateTo({
        url: '/pages/giftState/main?type=1'
      })
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

