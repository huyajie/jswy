<template>
  <div>
    <banner :banner-list="bannerList"></banner>
    <category></category>
    <recommend-list :list="list"></recommend-list>
    <conpon-mask></conpon-mask>
  </div>
</template>

<script>
import Banner from './components/Banner'
import Category from './components/Category'
import RecommendList from './components/Recommend'
import ConponMask from './components/ConponMask'
export default {
  data() {
    let _this = this
    return {
      list: [],
      bannerList: [
        {
          src: require('@/assets/images/home/ban1.jpg'),
          callback() {
            _this.$router.navigateTo({
              url: `/pages/webview/main?src=${encodeURIComponent('https://m.51baomu.cn/xiaochengxu/200youhui/')}`
            })
          }
        },
        require('@/assets/images/home/ban2.jpg'),
        require('@/assets/images/home/ban3.jpg'),
        require('@/assets/images/home/ban4.jpg')
      ]
    }
  },

  components: {
    Banner,
    Category,
    RecommendList,
    ConponMask
  },

  methods: {},

  created() {
    // let app = getApp()
    // mpvue.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })
  },
  mounted() {
    // console.log(this.$root.$mp)
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
  onShareAppMessage() {}
}
</script>

<style scoped>
</style>

