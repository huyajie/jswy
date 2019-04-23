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
        { text: '住家保姆', query: '住家保姆', path: 'list' },
        { text: '不住家保姆', query: '不住家保姆', path: 'list' },
        { text: '月嫂', query: '月嫂', path: 'list' },
        { text: '育儿嫂', query: '育儿嫂', path: 'list' },
        { text: '长期小时工', query: '小时工', path: 'list' },
        { text: '临时小时工', query: '小时工', path: 'detail' },
        { text: '护工', query: '护工', path: 'detail' },
        { text: '菲佣', query: '菲佣', path: 'feiyong' }
      ]
    }
  },
  methods: {
    toDetail(item) {
      if (item.path === 'list') {
        let url = `/pages/list/main`
        this.$store.commit('CHANGE_QUERYTYPE', item.query)
        this.$router.switchTab({ url })
      } else if (item.path === 'detail') {
        let url = `/pages/detail/main?type=${item.query}`
        // console.log(url)
        this.$router.navigateTo({ url })
      } else if (item.path === 'feiyong') {
        this.$router.navigateTo({
          url: `/pages/webview/main?src=${encodeURIComponent('https://fy.51baomu.cn?a=12&b=2')}`
        })
      }
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

