<template>
  <div class="rule">
    <div class="title">
      使用人群
      <p class="txt">所有无忧家政注册用户</p>
    </div>
    <div class="list">
      <div class="sub-title">活动规则：</div>
      <div class="item">1、每人每天可以获得1次免费抽奖机会；</div>
      <div class="item">2、分享后可以额外增加1次抽奖机会，每日限5次；</div>
    </div>
    <div class="list">
      <div class="sub-title">奖品说明：</div>
      <div class="item">1、抽中实物类奖品，会有工作人员电话联系，并邮寄；</div>
      <div class="item">2、家政服务券类奖品，请下载“无忧保姆APP”查看，登录手机号与抽奖手机号一致；</div>
      <div class="item">3、商城券类奖品，请在微信小程序“家事无忧商城”中查看，登录手机号与抽奖手机号一致；</div>
      <div class="item pt">本活动最终解释权归长沙家事无忧家政服务有限公司所有</div>
    </div>
    <div class="btn-group">
      <button class="btn" open-type="share">增加抽奖次数</button>
      <button class="btn" @click="back">立即抽奖</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.navigateBack()
    }
  },
  onShareAppMessage() {}
}
</script>

<style lang="scss" scoped>
.rule {
  .btn-group {
    display: flex;
    padding: 50rpx 38rpx;
    .btn {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      border: 2rpx solid #0ab727;
      border-radius: 8rpx;
      color: #fff;
      background: #0ab727;
      font-size: 30rpx;
      &:first-child {
        background: #fff;
        color: #0ab727;
        margin-right: 36rpx;
      }
    }
  }
  .list {
    background: #fff;
    margin-top: 10rpx;
    padding: 44rpx;
    .sub-title {
      color: #999;
      font-size: 26rpx;
      margin-bottom: 15rpx;
    }
    .item {
      font-size: 26rpx;
      line-height: 48rpx;
    }
    .pt {
      padding-top: 20rpx;
    }
  }
  .title {
    padding: 30rpx 44rpx 50rpx;
    background: #fff;
    color: #999;
    font-size: 24rpx;
    .txt {
      font-size: 30rpx;
      padding-top: 10rpx;
      color: #333;
    }
  }
}
</style>
