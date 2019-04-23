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
      bannerList: ['http://m.51baomu.cn/tupian/jzxiaochengxu/xbanner.png']
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