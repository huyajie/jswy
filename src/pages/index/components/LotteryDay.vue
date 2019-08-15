<template>
  <div class="lottery-index">
    <div class="item" @click="goLottery">
      <img class="img" mode="aspectFit" src="../../../assets/images/home/lottery_1.png" alt />
    </div>
    <div class="item">
      <!-- open-type="share" -->
      <button class="btn" @click="goShare">
        <img class="img" mode="aspectFit" src="../../../assets/images/home/lottery_2.png" alt />
      </button>
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'

export default {
  methods: {
    goLottery() {
      this.$router.navigateTo({
        url: '/pages/package/lottery/main'
      })
    },
    goShare() {
      if (!Auth.checkLogin()) {
        return false
      }
      this.$router.navigateTo({
        url: '/pages/invite/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lottery-index {
  display: flex;
  padding: 38rpx 30rpx;
  background: #fff;
  justify-content: space-between;
  .btn {
    width: 334rpx;
    height: 120rpx;
    background: none;
  }
  .img {
    width: 334rpx;
    height: 120rpx;
  }
}
</style>