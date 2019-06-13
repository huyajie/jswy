<template>
  <div>
    <gift-sucess v-if="state==1"></gift-sucess>

    <gift-fail v-if="state==2"></gift-fail>
  </div>
</template>

<script>
import GiftFail from './components/GiftFail.vue'
import GiftSucess from './components/GiftSucess.vue'
export default {
  data() {
    return {
      state: ''
    }
  },
  components: {
    GiftSucess,
    GiftFail
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let $mp = this.$root.$mp
    this.state = $mp.query.type
    console.log(this)
  }
}
</script>

<style lang="scss">
</style>

