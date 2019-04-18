<template>
  <div>
    <basic-detail :detail="detail"></basic-detail>
    <recommend-list :list="[1,2,3,4]"></recommend-list>
  </div>
</template>

<script>
import BasicDetail from './components/BasicDetail.vue'
import RecommendList from './components/Recommend'

export default {
  components: {
    BasicDetail,
    RecommendList
  },
  data() {
    return {
      detail: {}
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    // console.log($mp)
    // let id = $mp.query.id
    let id = 103995

    if (id) {
      this.$http.get(`ayis/${id}`).then(res => {
        console.log(res)
        if (res.ret === 0 && res.data && res.data.length > 0) {
          this.detail = res.data[0]
        }
      })
    } else {
      this.$router.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

