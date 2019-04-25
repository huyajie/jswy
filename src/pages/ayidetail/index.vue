<template>
  <div>
    <div v-show="isLoad" class="wrap">
      <basic-detail @submit="onSubmit" :detail="detail"></basic-detail>
      <recommend-list :list="list"></recommend-list>
    </div>
    <load-effect v-if="!isLoad"></load-effect>
  </div>
</template>

<script>
import LoadEffect from '@/components/LoadEffect.vue'
import BasicDetail from './components/BasicDetail.vue'
import RecommendList from './components/Recommend'
import Auth from '@/utils/auth.js'
const dataArr = []

export default {
  components: {
    BasicDetail,
    RecommendList,
    LoadEffect
  },
  data() {
    return {
      isLoad: false,
      detail: {},
      list: []
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    // console.log($mp)
    // let id = $mp.query.id
    let id = 953

    if (id) {
      this.$http.get(`ayis/${id}`, {}, null, true).then(res => {
        // console.log(res)
        this.isLoad = true
        if (res.ret === 0 && res.data && res.data.length > 0) {
          this.detail = res.data[0]
        }
        this.getRecommend().then(res => {
          // console.log(111111, res)
          dataArr.push({ ...this.$data })
        })
      })
      // this.getRecommend()
    } else {
      this.$router.navigateBack({
        delta: 1
      })
    }
  },
  onUnload() {
    // console.log(dataArr)
    dataArr.pop()
    const dataNum = dataArr.length
    if (!dataNum) return
    Object.assign(this.$data, dataArr[dataNum - 1])
  },
  methods: {
    onSubmit() {
      if (!Auth.checkLogin()) {
        return false
      }
      this.$router.navigateTo({
        url: `/pages/orderResult/main?type=2&state=1`
      })
    },
    getRecommend() {
      return this.$http
        .get(
          'tjayis',
          {
            page: 1,
            page_size: 5
          },
          null,
          true
        )
        .then(res => {
          // console.log(res)
          if (res.ret === 0) {
            this.list = res.data.results
          } else {
            this.list = []
          }
          return res
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding-bottom: 90rpx;
}
</style>

