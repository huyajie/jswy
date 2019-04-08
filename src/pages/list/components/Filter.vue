<template>
  <div>
    <div class="filter-wrap">
      <div class="filter" @click="aslide = true">
        <ul class="list">
          <li class="item">
            北京
            <i class="icon-arrew"></i>
          </li>
          <li class="item">
            住家保姆
            <i class="icon-arrew"></i>
          </li>
          <li class="item">
            3-5年经验
            <i class="icon-arrew"></i>
          </li>
          <li class="item">
            3000-3999
            <i class="icon-arrew"></i>
          </li>
          <li class="item">
            筛选
            <i class="icon-arrew"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="aslide" v-if="aslide">
      <div class="aslide-mask" @click="aslide = false" :class="aslide ? 'animated fadeIn' : ''"></div>
      <div class="aslide-wrap" v-if="aslide" :class="aslide ? 'animated slideInRight faster' : ''">
        <scroll-view scroll-y style="height:100%">
          <div v-for="item in 200" :key="item">1111</div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aslide: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/minxins.scss';

.filter-wrap {
  height: 82rpx;
  .filter {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    height: 82rpx;
    line-height: 82rpx;
    background: #e5f7e8;
    .list {
      display: flex;
      padding: 0 20rpx;
      justify-content: space-between;
      .item {
        // flex: 1;
        overflow: hidden;
        @include alignCenter;
        font-size: 24rpx;
        .icon-arrew {
          display: inline-block;
          margin-top: 12rpx;
          margin-left: 3rpx;
          width: 0;
          height: 0;
          border: 12rpx solid transparent;
          border-top-color: #000;
          transform: scaleX(0.8);
        }
      }
    }
  }
}

.aslide {
  .aslide-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .aslide-wrap {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 14%;
    bottom: 0;
    right: 0;
    background: #fff;
  }
  .aslide-wrap {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 14%;
    bottom: 0;
    right: 0;
    background: #fff;
  }
}
</style>

