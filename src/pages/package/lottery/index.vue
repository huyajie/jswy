<template>
  <div class="lottery-bg lattery">
    <div class="active-rule">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_02.png" alt />
    </div>
    <div class="tip-tel">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_01.png" alt />
      1581231231231抵扣券
    </div>
    <div class="title">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_03.png" alt />
    </div>
    <div class="count">
      <div class="text">
        您还有
        <span class="num">2</span>
        次免费抽奖机会，电脑等你来拿
      </div>
    </div>
    <div class="lottery-cont">
      <div class="go-btn">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/go.png" alt />
      </div>
      <div class="lottery-img">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lottery.jpg" alt />
      </div>
      <div class="lottery-foot-img">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/foot.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/backgroundImage.scss';

.lottery-cont {
  position: relative;
  margin-top: 14rpx;
  .lottery-img {
    width: 688rpx;
    height: 688rpx;
    margin: 0 auto;
    position: relative;
    .img {
      width: 688rpx;
      height: 688rpx;
      display: block;
    }
  }
  .lottery-foot-img {
    margin-top: -88rpx;

    .img {
      width: 723rpx;
      height: 321rpx;
    }
  }
  .go-btn {
    position: absolute;
    z-index: 9;
    top: 210rpx;
    left: 50%;

    transform: translate(-50%, 0);
    .img {
      width: 168rpx;
      height: 218rpx;
    }
  }
}

.lattery {
  position: relative;
  min-height: 100vh;
  background-size: 100% 100%;
  background-position: center top;
  background-color: #ffc03c;
  .active-rule {
    position: absolute;
    top: -1rpx;
    right: 20rpx;
    .img {
      width: 95rpx;
      height: 104rpx;
    }
  }
  .tip-tel {
    padding-top: 24rpx;
    padding-left: 24rpx;
    font-size: 26rpx;
    color: #312fe1;
    font-weight: bold;
    .img {
      width: 25rpx;
      height: 22rpx;
    }
  }
  .title {
    padding-top: 40rpx;
    text-align: center;
    .img {
      width: 544rpx;
      height: 118rpx;
    }
  }
  .count {
    height: 45rpx;
    text-align: center;
    padding-top: 10rpx;
    .text {
      display: inline-block;
      font-size: 24rpx;
      background-color: #fffeff;
      height: 45rpx;
      line-height: 45rpx;
      border-radius: 23rpx;
      padding: 0 23rpx;
      box-shadow: 0 4rpx 3rpx #d3d4d2;
      .num {
        display: inline-block;
        height: 44rpx;
        width: 44rpx;
        line-height: 44rpx;
        background-color: #4f3cf8;
        font-size: 32rpx;
        text-align: center;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
        vertical-align: -2rpx;
      }
    }
  }
}
</style>