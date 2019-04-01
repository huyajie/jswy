<template>
  <div class="banner">
    <swiper class="swiper" :indicator-dots="true" indicator-active-color="#0ab727">
      <swiper-item v-for="(item,index) in bannerList" :key="index">
        <img class="img" :src="item" alt>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        'http://img1.qunarzz.com/des-mis/ad/1704/85/e817a31674a37f.jpg',
        'http://m.51baomu.cn/tupian/jzxiaochengxu/xbanner.png'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
$bannerHeight: 230rpx;
.banner {
  height: bannerHeight;
  .swiper {
    height: bannerHeight;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>

