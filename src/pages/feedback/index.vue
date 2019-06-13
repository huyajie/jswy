<template>
  <div class="feedback">
    <div class="sub-tit">请选择反馈问题的类型</div>
    <div class="radio-group">
      <radio-group @change="radioChange">
        <label class="radio">
          功能异常
          <div class="small">不能使用现有功能</div>
          <radio :value="1" :checked="true"/>
        </label>
        <label class="radio">
          其他问题
          <div class="small">用的不爽、功能建议都提过来吧</div>
          <radio :value="2" :checked="false"/>
        </label>
      </radio-group>
    </div>
    <div class="sub-tit">问题和意见</div>
    <div class>
      <textarea class="textarea" placeholder="请详细描述您在使用家政无忧小程序时遇到的问题，如果功能异常，上传截图，可以更快解决" placeholder-style="color:#999;font-size:26rpx;line-height:1.8"/>
    </div>
    <div class="sub-tit">添加图片（选填，提供问题截图）</div>
    <div class="pic clearfix">
      <div class="item" @click="previewImage(item)" v-for="(item,index) in imgs" :key="index">
        <img class="img" :src="item" mode="aspectFit" alt>
      </div>
      <div class="add" @click="chooseImg">
        <img class="add-icon" src="../../assets/images/invite/fankuiicon01.png" alt>
      </div>
    </div>
    <div class="button-box">
      <button class="btn">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: []
    }
  },
  components: {},
  methods: {
    previewImage(link) {
      this.$utils.previewImage({
        current: link, // 当前显示图片的http链接
        urls: this.imgs // 需要预览的图片http链接列表
      })
    },
    radioChange() {},
    chooseImg() {
      let _this = this
      mpvue.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.imgs.push(...tempFilePaths)
          console.log(res)
        },
        complete(res) {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.feedback {
  padding-bottom: 90rpx;
  .button-box {
    position: fixed;
    width: 100%;
    height: 90rpx;
    bottom: 0;
    left: 0;
    .btn {
      background: $primary;
      height: 90rpx;
      color: #fff;
    }
  }
  .sub-tit {
    padding-left: 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 24rpx;
  }
  .radio-group {
    background: #fff;
    padding-left: 20rpx;
    .radio {
      display: flex;
      height: 105rpx;
      font-size: 30rpx;
      align-items: center;
      border-bottom: 1rpx solid #ddd;
      padding-left: 10rpx;
      padding-right: 15rpx;
      &:last-child {
        border-bottom: none;
      }
      .small {
        flex: 1;
        padding-left: 30rpx;
        font-size: 22rpx;
        color: #999;
      }
    }
  }
  .textarea {
    width: 100%;
    height: 210rpx;
    padding: 25rpx;
    box-sizing: border-box;
    background: #fff;
  }
  .pic {
    background: #fff;
    padding: 30rpx 0;
    .size {
      float: left;
      width: 115rpx;
      height: 152rpx;
      margin-left: 30rpx;
      margin-bottom: 30rpx;
      background: #efefef;
    }
    .item {
      @extend .size;
      .img {
        width: 115rpx;
        height: 152rpx;
      }
    }
    .add {
      @extend .size;
      display: flex;
      align-items: center;
      justify-content: center;

      .add-icon {
        width: 48rpx;
        height: 46rpx;
      }
    }
  }
}
</style>

