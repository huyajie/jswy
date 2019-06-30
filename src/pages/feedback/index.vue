<template>
  <div class="feedback">
    <div class="sub-tit">请选择反馈问题的类型</div>
    <div class="radio-group">
      <radio-group @change="radioChange">
        <label class="radio">
          功能异常
          <div class="small">不能使用现有功能</div>
          <radio :value="1" :checked="true" />
        </label>
        <label class="radio">
          其他问题
          <div class="small">用的不爽、功能建议都提过来吧</div>
          <radio :value="2" :checked="false" />
        </label>
      </radio-group>
    </div>
    <div class="sub-tit">问题和意见</div>
    <div class>
      <textarea v-model="ques" class="textarea" placeholder="请详细描述您在使用无忧家政小程序时遇到的问题，如果功能异常，上传截图，可以更快解决" placeholder-style="color:#999;font-size:26rpx;line-height:1.8" />
    </div>
    <div class="sub-tit">添加图片（选填，提供问题截图）</div>
    <div class="pic clearfix">
      <div class="item" @click="previewImage(item)" v-for="(item,index) in imgs" :key="index">
        <img class="img" :src="item" mode="aspectFit" alt />
        <div class="del-icon" @click.stop="delImg(index)">x</div>
      </div>
      <div class="add" @click="chooseImg">
        <img class="add-icon" src="../../assets/images/invite/fankuiicon01.png" alt />
      </div>
    </div>
    <div class="button-box">
      <button class="btn" @click="feedBack" :class="isSubmit?'disabled' : ''" :loading="isSubmit" :disabled="isSubmit">提交</button>
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'
import uploadImage from '@/utils/upload/index.js'

export default {
  data() {
    return {
      radio: '1',
      ques: '',
      imgs: [],
      isSubmit: false
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
    delImg(index) {
      this.imgs.splice(index, 1)
    },
    feedBack() {
      let parm = {
        errType: this.radio == '1' ? '功能异常' : '其他异常',
        errMsg: '',
        content: this.ques,
        imglist: JSON.stringify(this.imgs)
      }
      this.$http.post('fankui', parm).then(res => {
        console.log(res)
        if (res.ret === 0) {
          this.$utils.showError('反馈成功')
        } else if (res.msg) {
          this.$utils.showError(res.msg)
        } else {
          this.$utils.showError('系统异常')
        }
      })
    },
    radioChange(e) {
      console.log(e.mp.detail)
      this.radio = e.mp.detail.value
    },
    chooseImg() {
      let _this = this
      mpvue.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let id = Auth.getInfo('user_id')
          const tempFilePaths = res.tempFilePaths
          let filePath = tempFilePaths[0]
          // _this.imgs.push(filePath)
          let tmpArr = filePath.split('.')
          let name = new Date().getTime() + '.' + tmpArr[tmpArr.length - 1]
          mpvue.showLoading()
          uploadImage(
            filePath,
            `alioss/jzimg/type1/${id}` + name,
            function(result) {
              mpvue.hideLoading()
              console.log(result)
              _this.imgs.push(result)
            },
            function(result) {
              // console.log("======上传失败======", result);
              mpvue.hideLoading()
            }
          )
          console.log(res)
          console.log(name)
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
      position: relative;
      @extend .size;
      .del-icon {
        position: absolute;
        top: -15rpx;
        right: -15rpx;
        width: 32rpx;
        height: 32rpx;
        background: #f42c48;
        border-radius: 50%;
        line-height: 30rpx;
        text-align: center;
        color: #fff;
        font-size: 26rpx;
      }
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

