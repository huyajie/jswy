<template>
  <div>
    <div v-show="isLoad">
      <basic-detail @submit="onSubmit" :detail="detail"></basic-detail>
      <recommend-list :list="list" type="redirect"></recommend-list>
    </div>
    <load-effect v-if="!isLoad"></load-effect>
  </div>
</template>

<script>
import LoadEffect from '@/components/LoadEffect.vue'
import BasicDetail from './components/BasicDetail.vue'
import RecommendList from './components/Recommend'
import Auth from '@/utils/auth.js'

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
    let id = $mp.query.id
    // let id = 103995

    if (id) {
      this.$http.get(`ayis/${id}`, {}, null, true).then(res => {
        console.log(res)
        this.isLoad = true
        if (res.ret === 0 && res.data && res.data.length > 0) {
          this.detail = res.data[0]
        }
      })
      this.getRecommend()
    } else {
      this.$router.navigateBack({
        delta: 1
      })
    }
  },
  methods: {
    onSubmit() {
      Auth.checkLogin(this.$root.$mp)
    },
    getRecommend() {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

