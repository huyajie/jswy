<template>
  <div>
    <invite-type></invite-type>
    <invite-list></invite-list>
  </div>
</template>

<script>
import InviteType from './components/InviteType.vue'
import InviteList from './components/InviteList.vue'
export default {
  components: {
    InviteType,
    InviteList
  }
}
</script>

<style>
</style>
