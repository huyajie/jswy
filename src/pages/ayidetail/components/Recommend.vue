<template>
  <div class="recommend">
    <div class="sub-tit">
      <div class="sub-tit-inner">推荐阿姨</div>
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
      default: [1, 2]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/minxins.scss';
.recommend {
  .sub-tit {
    background-color: #fff;
    padding: 0 20rpx;
    .sub-tit-inner {
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      border-bottom: 1rpx solid #cdcdcd;
    }
  }
}
</style>

