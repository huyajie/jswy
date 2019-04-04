<template>
  <div>
    <div class="state">
      <template v-if="state==1">
        <div class="top">
          <img class="img" src="../../assets/images/yuyue/yycg.png">预约成功
        </div>
        <div class="bottom">
          <text class="text">家事无忧家政工作人员会尽快与您联系，请稍后！</text>
          <text class="text">如有问题，请致电：4006093600</text>
        </div>
      </template>
      <template v-if="state==2">
        <div class="top">
          <img class="img" src="../../assets/images/yuyue/yysb.png">预约失败
        </div>
        <div class="bottom">
          <text class="text">请重新输入后再提交预约！</text>
          <text class="text">如有问题，请致电：4006093600</text>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: ''
    }
  },
  mounted() {
    this.state = this.$root.$mp.query.state
    console.log(this.$root.$mp.query)
  }
}
</script>

<style lang="scss" scoped>
.state {
  background: #fff;
  padding: 60rpx 100rpx;
  font-size: 30rpx;
}
.state .img {
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
  margin-right: 20rpx;
  margin-top: -4rpx;
}
.top {
  border-bottom: 1px solid #e1e1e1;
  line-height: 80rpx;
  text-align: center;
  font-size: 36rpx;
}
.bottom {
  padding-top: 40rpx;
}
.bottom .text {
  display: block;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}
</style>

