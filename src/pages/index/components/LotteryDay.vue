<template>
  <div class="lottery-index">
    <div class="item">
      <img class="img" mode="aspectFit" src="../../../assets/images/home/lottery_1.png" alt />
    </div>
    <div class="item">
      <img class="img" mode="aspectFit" src="../../../assets/images/home/lottery_2.png" alt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.lottery-index {
  display: flex;
  padding: 38rpx 30rpx;
  background: #fff;
  justify-content: space-between;
  .img {
    width: 334rpx;
    height: 120rpx;
  }
}
</style>