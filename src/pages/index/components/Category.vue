<template>
  <div class="category clearfix">
    <div class="item" @click="toDetail(item)" v-for="(item,index) in category" :key="index">
      <div class="pic"></div>
      <p class="text">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [
        { text: '住家保姆', query: '' },
        { text: '不住家保姆', query: '' },
        { text: '月嫂', query: '' },
        { text: '育儿嫂', query: '' },
        { text: '长期小时工', query: '小时工' },
        { text: '临时小时工', query: '小时工' },
        { text: '护工', query: '护工' },
        { text: '快速预约', query: '' }
      ]
    }
  },
  methods: {
    toDetail(item) {
      if (!item.query) {
        return
      }
      let url = `/pages/detail/main?type=${item.query}`
      // console.log(url)
      this.$router.navigateTo({ url })
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

