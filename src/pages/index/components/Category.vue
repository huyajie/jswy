<template>
  <div class="category clearfix">
    <div class="item" v-for="(item,index) in category" :key="index">
      <div class="pic"></div>
      <p class="text">住家保姆</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  background: #fff;
  padding-top: 30rpx;
  .item {
    float: left;
    width: 25%;
    padding-bottom: 30rpx;
    .pic {
      width: 120rpx;
      height: 120rpx;
      margin: 0 auto;
      background: #75d18f;
      border-radius: 50%;
    }
    .text {
      text-align: center;
      font-size: 24rpx;
      line-height: 44rpx;
    }
  }
}
</style>

