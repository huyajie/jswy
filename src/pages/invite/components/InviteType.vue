<template>
  <div class="type-list">
    <div class="item" @click="goNext('inviteRealname')">
      <img class="img" src="../../../assets/images/invite/yaoqing_02.png" alt>
      <p class="text">实名邀请</p>
    </div>
    <div class="item" @click="goNext('inviteAnonymous')">
      <img class="img" src="../../../assets/images/invite/yaoqing_01.png" alt>
      <p class="text">匿名推荐</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goNext(link) {
      let url = `/pages/${link}/main`
      this.$router.navigateTo({
        url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.type-list {
  padding: 40rpx 0 30rpx;
  background: #fff;
  display: flex;
  .item {
    flex: 1;
    text-align: center;
    .img {
      width: 130rpx;
      height: 130rpx;
    }
  }
}
</style>

