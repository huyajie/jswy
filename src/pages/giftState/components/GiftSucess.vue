<template>
  <div>
    <div class="sucess-box">
      <img class="img" mode="aspectFit" src="../../../assets/images/state/right.png" alt>
      <p>领取成功</p>
      <div class="text">签约后，此券可抵扣服务费</div>
    </div>
    <div class="recommend">
      <div class="sub-tit">
        <span class="line"></span>推荐阿姨
        <span @click="goList" class="right">去挑选 &gt;</span>
      </div>
      <ayi-list :list="list"></ayi-list>
    </div>
  </div>
</template>

<script>
import AyiList from '@/components/AyiList.vue'

export default {
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    this.$http
      .get('tjayis', {
        page: 1,
        page_size: 5
      })
      .then(res => {
        // console.log(res)
        if (res.ret === 0) {
          this.list = res.data.results
        } else {
          this.list = []
        }
      })
  },
  components: {
    AyiList
  },
  methods: {
    goList() {
      this.$router.switchTab({
        url: '/pages/list/main'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.recommend {
  .sub-tit {
    padding: 10rpx 0;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 30rpx;
    .line {
      float: left;
      width: 5rpx;
      height: 30rpx;
      background: $primary;
      margin-left: 20rpx;
      margin-top: 20rpx;
      margin-right: 10rpx;
    }
    .right {
      float: right;
      color: $primary;
      margin-right: 20rpx;
    }
  }
}
.sucess-box {
  background: #fff;
  padding: 50rpx 50rpx 0;
  font-size: 22rpx;
  color: #999;
  text-align: center;
  .img {
    width: 120rpx;
    height: 120rpx;
  }
  .text {
    color: #333;
    font-size: 35rpx;
    padding: 30rpx;
    margin-top: 20rpx;
    border-top: 1rpx solid #ddd;
  }
}
</style>

