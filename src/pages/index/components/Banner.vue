<template>
  <div class="banner" :class="source == 'detail' ? 'detail' :''">
    <swiper class="swiper" :indicator-dots="bannerListTrans.length>1" indicator-active-color="#0ab727">
      <swiper-item v-for="(item,index) in bannerListTrans" :key="index" @click="bannerClick(index)">
        <img class="img" :src="item.src" alt />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    bannerListTrans() {
      let tmpArr = []
      this.bannerList.forEach(item => {
        let type = typeof item

        if (type === 'string') {
          tmpArr.push({ src: item })
        } else {
          tmpArr.push(item)
        }
      })
      console.log(tmpArr)
      return tmpArr
    }
  },
  props: {
    source: {
      type: String,
      default: 'index'
    },
    bannerList: {
      type: Array,
      default() {
        return ['http://m.51baomu.cn/tupian/jzxiaochengxu/xbanner.png']
      }
    }
  },
  methods: {
    bannerClick(idx) {
      let obj = this.bannerListTrans[idx]
      obj.callback && obj.callback()
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

