<template>
  <div>
    <div class="state" v-if="type ==1">
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
    <div v-if="type == 2">
      <ayi-order :state="state"></ayi-order>
    </div>
  </div>
</template>

<script>
import AyiOrder from './components/AyiOrder.vue'
export default {
  components: {
    AyiOrder
  },
  data() {
    return {
      state: '', // 1成功  2失败
      type: 1 //1  小时工和护工预约结果页面   2 阿姨预约结果页面
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let query = this.$root.$mp.query
    this.state = this.$root.$mp.query.state
    if (query.type) {
      this.type = query.type
    }
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

