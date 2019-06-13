<template>
  <div>
    <div class="user">
      <div class="img-box">
        <img class="img" :src=" userInfo.photo ? userInfo.photo :'../../../assets/images/list/default_head.jpg'" alt>
      </div>
      <div class="info">
        <div>
          <p class="name">{{userInfo.nikename}}</p>
          <p class="tel">{{userInfo.mobile}}</p>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" @click="goNext('invite')">
        <div class="icon-box">
          <img class="img" mode="aspectFit" src="../../../assets/images/invite/wo_icon01.png" alt>
        </div>
        <div class="text">邀请好友领红包</div>
        <div class="arrew"></div>
      </div>
      <div class="item" @click="goNext('feedback')">
        <div class="icon-box">
          <img class="img" mode="aspectFit" src="../../../assets/images/invite/wo_icon02.png" alt>
        </div>
        <div class="text">意见反馈</div>
        <div class="arrew"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'

export default {
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goNext(link) {
      if (!Auth.checkLogin()) {
        return false
      }
      let url = `/pages/${link}/main`
      this.$router.navigateTo({
        url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/minxins.scss';

.list {
  margin-top: 10rpx;
  padding-left: 20rpx;
  background-color: #fff;
  .item {
    &:last-child {
      border-bottom: none;
    }
    height: 120rpx;
    border-bottom: 1rpx solid #ddd;
    display: flex;
    .arrew {
      top: 44rpx;
      margin-right: 10rpx;
      @include arrow-right(16rpx);
    }
    .icon-box {
      width: 70rpx;
      display: flex;
      align-items: center;
      .img {
        margin-left: 10rpx;
        width: 45rpx;
        height: 45rpx;
      }
    }
    .text {
      flex: 1;
      font-size: 30rpx;
      line-height: 120rpx;
    }
  }
}
.user {
  padding: 30rpx 20rpx;
  background: #fff;
  display: flex;
  .img-box {
    width: 120rpx;
    height: 120rpx;
    margin-right: 25rpx;
    .img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #333;
    .tel {
      font-size: 32rpx;
    }
  }
}
</style>

