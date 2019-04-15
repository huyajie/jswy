<template>
  <div>
    <ul class="r-list">
      <li class="list-item" v-for="item in list" :key="item.id">
        <div class="pic">
          <img class="img" src="http://img1.qunarzz.com/sight/p0/1708/2b/2b3b94de99c0a425a3.img.jpg_200x200_2458ffb2.jpg" alt>
        </div>
        <div class="cont">
          <div>
            <p class="cont-title">
              {{item.xingming}}
              <span class="age">44岁</span>
            </p>
            <div class="tags">
              <span class="tag">做饭</span>
              <span class="tag">做饭做饭</span>
            </div>
            <p class="cont-detail">
              {{item.jiguan}}
              <span class="cont-line">|</span>
              {{item.xueli}}
            </p>
          </div>
        </div>
        <div class="button-box">
          <button class="button">预约</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/minxins.scss';
.r-list {
  .list-item {
    display: flex;
    margin-bottom: 10rpx;
    background: #fff;
    .pic {
      width: 120rpx;
      height: 120rpx;
      padding: 30rpx 10rpx 30rpx 20rpx;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .cont {
      flex: 1;
      @include alignCenter;
      .cont-title {
        font-size: 30rpx;
        .age {
          padding-left: 20rpx;
        }
      }
      .tags {
        padding: 10rpx 0;
        .tag {
          height: 34rpx;
          box-sizing: border-box;
          line-height: 30rpx;
          font-size: 24rpx;
          display: inline-block;
          padding: 0 10rpx;
          border: 2rpx solid $primary;
          color: $primary;
          border-radius: 6rpx;
          margin-right: 10rpx;
        }
      }
      .cont-detail {
        font-size: 24rpx;
        .cont-line {
          padding: 0 5rpx;
          color: #999;
          font-size: 20rpx;
        }
      }
    }
    .button-box {
      padding-right: 20rpx;
      @include alignCenter;
      .button {
        width: 105rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 28rpx;
        color: #fff;
        background: $primary;
        border-radius: 10rpx;
      }
    }
  }
}
</style>

