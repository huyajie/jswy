<template>
  <div>
    <banner></banner>
    <category></category>
    <recommend-list></recommend-list>
  </div>
</template>

<script>
import Banner from './components/Banner'
import Category from './components/Category'
import RecommendList from './components/Recommend'
export default {
  data() {
    return {}
  },

  components: {
    Banner,
    Category,
    RecommendList
  },

  methods: {},

  created() {
    // let app = getApp()
    mpvue.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  }
}
</script>

<style scoped>
</style>

