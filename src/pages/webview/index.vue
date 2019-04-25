<template>
  <div>
    <web-view :src="srcWebView"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcWebView: ''
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    if ($mp.query.src) {
      let srcView = decodeURIComponent($mp.query.src)
      this.srcWebView = srcView
      console.log(srcView)
    } else {
      //
    }

    console.log($mp)
  }
}
</script>

<style>
</style>
