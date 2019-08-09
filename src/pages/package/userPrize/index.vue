<template>
  <div class="prize">
    <div class="table">
      <div class="tr">
        <div class="th">奖品</div>
        <div class="th">获取时间</div>
      </div>
      <div class="tr">
        <div class="td">100元家政抵扣卷</div>
        <div class="td">2018-10-10 12:10:35</div>
      </div>
      <div class="tr">
        <div class="td">100元家政抵扣卷</div>
        <div class="td">2018-10-10 12:10:35</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.prize {
  background: #fff;
  padding: 20rpx 0;
}
.table {
  .tr {
    display: flex;
    padding: 10rpx 0;
    .th,
    .td {
      flex: 1;
      display: flex;
      min-height: 50rpx;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      .red {
        color: #fd0100;
      }
    }
    .th {
      font-size: 24rpx;
      color: #999;
    }
    // &:nth-child(2n):not(.sum) {
    //   background: #eee;
    // }
  }
}
</style>