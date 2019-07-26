<template>
  <div v-show="showAdd">
    <div class="add-my">
      <div class="arrow"></div>
      <div class="text">
        点击“
        <span class="big">
          <img class="img" mode="aspectFit" src="../../../assets/images/new_user/yindao_icon01.png" alt />
        </span>
        ”添加到我的小程序，
        <br />微信首页下拉即可快速访问
      </div>
      <div class="close" @click="showAdd = false">
        <!-- <span class="span">X</span> -->
        <img class="img" mode="aspectFit" src="../../../assets/images/new_user/yindao_icon02.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAdd: true
    }
  }
}
</script>

<style lang="scss" scoped>
.add-my {
  position: fixed;
  display: flex;
  background: #fff;
  border-radius: 10rpx;
  top: 20rpx;
  right: 30rpx;
  z-index: 9;
  font-size: 24rpx;
  padding: 20rpx;
  // box-shadow: 2px 2px 5px #333333;
  box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.5);
  .big {
    .img {
      width: 36rpx;
      height: 12rpx;
    }
  }
  .arrow {
    position: absolute;
    border: 16rpx solid transparent;
    border-bottom-color: #fff;
    right: 100rpx;
    top: -32rpx;
  }
  .close {
    padding-left: 20rpx;
    padding-top: 10rpx;
    .img {
      width: 44rpx;
      height: 44rpx;
    }
    .span {
      display: inline-block;
      width: 48rpx;
      height: 48rpx;
      background-color: #dadada;
      border-radius: 50%;
      color: #fff;
      line-height: 48rpx;
      text-align: center;
      font-weight: bold;
      font-size: 26rpx;
    }
  }
}
</style>