<template>
  <div>
    <banner source="detail" :bannerList="bannerList"></banner>
    <form-list></form-list>
  </div>
</template>

<script>
import Banner from '../index/components/Banner'
import FormList from './components/FormList'

export default {
  data() {
    return {
      // bannerList: []
    }
  },
  components: {
    Banner,
    FormList
  }
}
</script>

<style>
</style>