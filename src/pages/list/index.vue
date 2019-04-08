<template>
  <div class="open-pop">
    <filter></filter>
    <ayi-list :list="list"></ayi-list>
  </div>
</template>

<script>
import Filter from './components/Filter'
import AyiList from '@/components/AyiList.vue'
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 4, 22, 5, 6, 7, 7, 6, 7]
    }
  },
  components: {
    Filter,
    AyiList
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.open-pop {
  height: 100vh;
  overflow: hidden;
}
</style>

