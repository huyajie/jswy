<template>
  <div class="ayi-result">
    <template v-if="state =='1'">
      <div class="state-box">
        <img class="img" src="../../../assets/images/state/right.png" alt>
      </div>
      <div class="state-text">预约成功</div>
      <div class="desc">工作人员会尽快联系您！</div>
    </template>

    <template v-if="state =='2'">
      <div class="state-box">
        <img class="img" src="../../../assets/images/state/err.png" alt>
      </div>
      <div class="state-text">预约失败</div>
      <div class="desc">您可致电 17346578021 预约阿姨！</div>
    </template>
  </div>
</template>
  

<script>
export default {
  props: {
    state: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.ayi-result {
  padding: 60rpx 50rpx 0 50rpx;
  background: #fff;
  text-align: center;
  .state-box {
    .img {
      width: 125rpx;
      height: 125rpx;
    }
  }
  .state-text {
    padding-top: 15rpx;
    color: #999999;
    font-size: 24rpx;
  }
  .desc {
    margin-top: 30rpx;
    padding: 30rpx 0;
    border-top: 1rpx solid #dddddd;
  }
}
</style>

