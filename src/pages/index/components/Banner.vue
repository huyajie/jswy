<template>
  <div class="banner" :class="source == 'detail' ? 'detail' :''">
    <swiper class="swiper" :indicator-dots="bannerList.length>1" indicator-active-color="#0ab727">
      <swiper-item v-for="(item,index) in bannerList" :key="index">
        <img class="img" :src="item" alt>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    source: {
      type: String,
      default: 'index'
    },
    bannerList: {
      type: Array,
      default: [require('@/assets/images/home/banner.jpg'), 'http://m.51baomu.cn/tupian/jzxiaochengxu/xbanner.png']
    }
  },
  created() {
    console.log(this.source)
  }
}
</script>
<style lang="scss" scoped>
$bannerHeight: 230rpx;
.banner {
  height: $bannerHeight;
  &.detail {
    margin: 10rpx;
  }
  .swiper {
    height: $bannerHeight;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>

