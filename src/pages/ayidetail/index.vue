<template>
  <div>
    <div v-show="isLoad" class="wrap">
      <basic-detail ref="detail" @submit="onSubmit" :detail="detail"></basic-detail>
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
      list: [],
      id: ''
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    // console.log($mp)
    this.id = $mp.query.id
    let id = $mp.query.id
    // let id = 953

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
  onShareAppMessage(res) {
    if (res.from === 'button') {
      let id = Auth.getInfo('user_id')
      let mobile = Auth.getInfo('shoujihao')
      return {
        title: '推荐你来这儿找家政服务，服务很好，给您申请了200元家政红包，找家政服务更便宜，快领！',
        path: `/pages/gifts/main?id=${id}&mobile=${mobile}`,
        imageUrl: require('../../assets/images/invite/share.png')
      }
      console.log(res)
    } else {
      return {
        path: `/pages/ayidetail/main?id=${this.id}`
      }
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
      let mobile = Auth.getInfo('shoujihao')
      console.log(mobile)
      let parm = {
        bmid: this.id
        // shoujihao : mobile
        // lianxidianhua: '18612191607'
      }
      this.$refs.detail.submitLoading = true
      this.$http.post('yuyueayi', parm).then(
        res => {
          this.$refs.detail.submitLoading = false
          let state = ''
          if (res.ret === 0) {
            state = 1
          } else {
            state = 2
          }
          this.$router.navigateTo({
            url: `/pages/orderResult/main?type=2&state=${state}`
          })
          console.log(res)
        },
        err => {
          this.$refs.detail.submitLoading = false
          this.$router.navigateTo({
            url: `/pages/orderResult/main?type=2&state=2`
          })
        }
      )
      // this.$router.navigateTo({
      //   url: `/pages/orderResult/main?type=2&state=1`
      // })
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

