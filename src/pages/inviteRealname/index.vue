<template>
  <div class="wrap">
    <div class="banner">
      <img class="img" src="../../assets/images/invite/yaoqing_bt.png" alt>
    </div>
    <div class="card">
      <div class="title">
        <img class="img" src="../../assets/images/invite/yaoqing_04.png" alt>
        <span class="text">奖励说明</span>
        <img class="img" src="../../assets/images/invite/yaoqing_04.png" alt>
      </div>
      <div class="card-inner explain">
        <div class="item">
          <p class="sub-tit">自己</p>
          <p class="text">好友通过你的邀请签约后，你将获得200元工资卷，可用于给阿姨发工资。</p>
        </div>
        <div class="item line">
          <p class="sub-tit">好友</p>
          <p class="text">好友通过你的邀请注册，可直接获得200元家政红包，可抵扣服务费，找家政服务，更便宜。</p>
        </div>
      </div>
    </div>
    <div class="card p0">
      <div class="title">
        <img class="img" src="../../assets/images/invite/yaoqing_04.png" alt>
        <span class="text">邀请方式</span>
        <img class="img" src="../../assets/images/invite/yaoqing_04.png" alt>
      </div>
      <div class="invite-type-list">
        <div class="item">
          <div class="flex-center">
            <img class="img" src="../../assets/images/invite/yaoqing_07.png" alt>
          </div>
          <div class="flex-center text">
            <p>
              打开微信列表
              <br>直接邀请好友
            </p>
          </div>
          <div class="flex-center">
            <button class="btn" open-type="share">
              <img class="icon icon-wx" src="../../assets/images/invite/yaoqing_05.png" alt>
              马上邀请好友
            </button>
          </div>
        </div>
        <div class="item">
          <div class="flex-center">
            <img class="img" src="../../assets/images/invite/yaoqing_08.png" alt>
          </div>
          <div class="flex-center text">
            <p>
              生成图片
              <br>发朋友圈或发给好友
            </p>
          </div>
          <div class="flex-center">
            <button class="btn save-btn">
              <img class="icon icon-down" src="../../assets/images/invite/yaoqing_06.png" alt>
              保存图片
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  onShareAppMessage: function(res) {
    return {
      title: '推荐你来这儿找家政服务，服务很好，给您申请了200元家政红包，找家政服务更便宜，快领！',
      path: '/pages/gifts/main',
      imageUrl: require('../../assets/images/invite/share.png')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/backgroundImage.scss';
@import '@/assets/scss/minxins.scss';

.wrap {
  @extend .active;
  background-size: cover;
  min-height: 100vh;
  padding: 0 20rpx;
}
.banner {
  padding-top: 50rpx;
  .img {
    width: 702rpx;
    height: 149rpx;
  }
}
.card {
  margin-top: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  &.p0 {
    padding-right: 0;
  }
  .title {
    text-align: center;
    height: 60rpx;
    .img {
      width: 41rpx;
      height: 32rpx;
    }
    .text {
      font-size: 30rpx;
      padding: 0 95rpx;
      color: #fd9558;
    }
  }
  .card-inner {
    background: #f5f5f5;
    border-radius: 16rpx;
    padding: 20rpx 0;
  }
}
.explain {
  display: flex;
  .line {
    border-left: 2rpx solid #fff;
  }
  .item {
    flex: 1;
    .sub-tit {
      color: #0db629;
      font-size: 36rpx;
      text-align: center;
      padding: 15rpx 0;
    }
    .text {
      line-height: 2;
      padding: 0 22rpx;
      font-size: 24rpx;
    }
  }
}
.invite-type-list {
  padding-left: 40rpx;
  .item {
    display: flex;
    padding-right: 40rpx;
    padding-top: 50rpx;
    padding-bottom: 50rpx;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .flex-center {
      @include alignCenter;
    }
    .img {
      width: 44rpx;
      height: 44rpx;
    }
    .text {
      margin-left: 20rpx;
      flex: 1;
    }
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 30rpx;
      color: #fff;
      padding: 0 30rpx;
      background: #0bb727;
      border-radius: 10rpx;
      &.save-btn {
        background: #fe6031;
      }
      .icon {
        vertical-align: -2px;
        &.icon-wx {
          width: 35rpx;
          height: 30rpx;
        }
        &.icon-down {
          width: 18rpx;
          height: 26rpx;
        }
      }
    }
  }
}
</style>

