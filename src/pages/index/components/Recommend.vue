<template>
  <div class="recommend">
    <div class="sub-tit">
      <span class="line"></span>推荐服务员
    </div>
    <ayi-list :list="list"></ayi-list>
  </div>
</template>

<script>
import AyiList from '@/components/AyiList.vue'
export default {
  components: {
    AyiList
  },
  data() {
    return {
      // list: [1, 2, 3, 4, 5]
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/minxins.scss';
.recommend {
  .sub-tit {
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
  }
}
</style>

