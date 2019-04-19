<template>
  <div class="loadEffect">
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
    <span class="span"></span>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.loadEffect {
  width: 100rpx;
  height: 100rpx;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  position: fixed;
}
.loadEffect .span {
  display: inline-block;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: $primary;
  position: absolute;
  -webkit-animation: load 1.04s ease infinite;
  animation: load 1.04s ease infinite;
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
@keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
.loadEffect .span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -8rpx;
  -webkit-animation-delay: 0.13s;
  animation-delay: 0.13s;
}
.loadEffect .span:nth-child(2) {
  left: 14rpx;
  top: 14rpx;
  -webkit-animation-delay: 0.26s;
  animation-delay: 0.26s;
}
.loadEffect .span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -8rpx;
  -webkit-animation-delay: 0.39s;
  animation-delay: 0.39s;
}
.loadEffect .span:nth-child(4) {
  top: 14rpx;
  right: 14rpx;
  -webkit-animation-delay: 0.52s;
  animation-delay: 0.52s;
}
.loadEffect .span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -8rpx;
  -webkit-animation-delay: 0.65s;
  animation-delay: 0.65s;
}
.loadEffect .span:nth-child(6) {
  right: 14rpx;
  bottom: 14rpx;
  -webkit-animation-delay: 0.78s;
  animation-delay: 0.78s;
}
.loadEffect .span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -8rpx;
  -webkit-animation-delay: 0.91s;
  animation-delay: 0.91s;
}
.loadEffect .span:nth-child(8) {
  bottom: 14rpx;
  left: 14rpx;
  -webkit-animation-delay: 1.04s;
  animation-delay: 1.04s;
}
</style>

