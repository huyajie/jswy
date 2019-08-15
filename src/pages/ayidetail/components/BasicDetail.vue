<template>
  <div>
    <div class="submit-cont">
      <div class="tel" @click="goYuyue">
        <img src="../../../assets/images/detail/tel.jpg" class="img-tel" alt />留电咨询
      </div>
      <button class="btn" :class="submitLoading?'disabled' : ''" @click="submit" :disabled="submitLoading" :loading="submitLoading">预约此服务员</button>
    </div>
    <div class="ayi-info">
      <!-- <div class="recommend-tag" @click="recommendEvent">
        推荐有奖
        <span class="icon-ques">?</span>
      </div>-->
      <div class="recommend-tag">
        <button class="btn-share" open-type="share">转发分享</button>
      </div>
      <div class="flex-box">
        <div class="pic">
          <img class="img" :src="details.photo ? details.photo : defaultHead" alt />
        </div>
        <div class="cont">
          <div>
            <p class="cont-title">
              <span class="big">{{details.xingming}}</span>
              ID:{{details.id}}
            </p>

            <p class="cont-detail">工作类型：{{details.gongzuoleixing}}&emsp;工资：{{details.qiwangxinzi2}}/月</p>
          </div>
        </div>
      </div>

      <div class="tags">
        <span class="tag" v-for="(item ,index) in zhiyeyoushi" :key="index">{{item}}</span>
        <!-- <span class="tag">做饭做饭</span> -->
      </div>
    </div>
    <div class="ayi-detail">
      <div class="item clearfix">
        <span class="right-cont">{{details.xingbie}}</span>性别
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.jiguan}}</span>籍贯
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.minzu}}</span>民族
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{age}}岁</span>年龄
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.shuxiang}}</span>属相
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.xingzuo}}</span>星座
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.hunyin}}</span>婚姻状况
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.xueli}}</span>最高学历
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.curshi}}</span>当前城市
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.qzshi}}</span>求职区域
      </div>
      <div class="item clearfix">
        <span class="right-cont">{{details.xiuximeizhou}}/每周</span>休息天数
      </div>
    </div>
    <div class="ayi-cont">
      <template v-if="isLogin">
        <div class="item">
          <div class="sub-tit">自我介绍</div>
          <div class="cont">{{details.ziwojieshao || '暂无'}}</div>
        </div>
        <div class="item">
          <div class="sub-tit">证件 / 作品展示</div>
          <div class="cont-img clearfix">
            <div class="img-item" @click="previewImage(item)" v-for="(item,index) in zhengjiantupian" :key="index">
              <img class="img" mode="aspectFit" :src="item+'?x-oss-process=style/hdd'" alt />
            </div>
            <!-- <div class="img-item">
            <img class="img" mode="aspectFit" src="https://imgs.qunarzz.com/sight/p0/1708/2b/2b3b94de99c0a425a3.img.jpg_222x168_93cb017d.jpg" alt>
          </div>
          <div class="img-item">
            <img class="img" mode="aspectFit" src="https://source.qunarzz.com/mkt_download/guide/osaka/imgs/cover300_ddc0f2bc.jpg" alt>
          </div>
          <div class="img-item">
            <img class="img" mode="aspectFit" src="http://img1.qunarzz.com/sight/p0/1708/2b/2b3b94de99c0a425a3.img.jpg_200x200_2458ffb2.jpg" alt>
            </div>-->
          </div>
        </div>
      </template>
      <div class="login-see" v-else @click="toLogin">
        <img class="img" mode="aspectFit" src="../../../assets/images/new_user/icon_yinshi.png" alt />
        登录后查看更多
      </div>
    </div>
    <div class="recommend-pop" v-if="showModal" @touchmove.stop="move">
      <div class="mask"></div>
      <div class="cont">
        <button class="share-btn" open-type="share"></button>
        <img mode="aspectFit" src="../../../assets/images/invite/tuijiantc01.png" alt class="img" />
        <img mode="aspectFit" src="../../../assets/images/invite/tuijiantc01_gb.png" alt class="close" @click="showModal=false" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Auth from '@/utils/auth.js'

const defaultHead = require('@/assets/images/list/default_head.jpg')

export default {
  data() {
    return {
      submitLoading: false,
      defaultHead: defaultHead,
      showModal: false,
      isLogin: false
    }
  },
  onLoad() {
    this.isLogin = Auth.isLogin()
  },
  onShow() {
    this.isLogin = Auth.isLogin()
  },
  methods: {
    toLogin() {
      Auth.checkLogin()
    },
    move() {},
    recommendEvent() {
      if (Auth.checkLogin()) {
        this.showModal = true
      }
    },
    previewImage(link) {
      this.$utils.previewImage({
        current: link, // 当前显示图片的http链接
        urls: this.zhengjiantupian // 需要预览的图片http链接列表
      })
    },
    submit() {
      this.$emit('submit')
    },
    goYuyue() {
      let url = `/pages/detail/main`
      // console.log(url)
      this.$router.navigateTo({ url })
    }
  },
  computed: {
    details() {
      let obj = {}
      for (const key in this.detail) {
        if (this.detail.hasOwnProperty(key)) {
          obj[key] = this.detail[key] ? this.detail[key] : ''
        }
      }
      return obj
    },
    age() {
      let ayiBirthday = dayjs(this.detail.shengri)
      if (ayiBirthday.isValid()) {
        return dayjs().diff(ayiBirthday, 'year')
        // return dayjs(this.detail.shengri).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    zhengjiantupian() {
      let arr = []
      if (this.detail.zhengjiantupian) {
        try {
          let pics = JSON.parse(this.detail.zhengjiantupian)
          // console.log(zyys)
          if (pics) {
            // pics.forEach(item => {
            //   arr.push(item.replace(/ /g, '%20'))
            // })
            arr = pics
          }
        } catch (error) {}
      }
      return arr
    },
    zhiyeyoushi() {
      let arr = []
      if (this.detail.zhiyeyoushi) {
        try {
          let zyys = JSON.parse(this.detail.zhiyeyoushi)
          // console.log(zyys)
          if (zyys) {
            zyys.forEach(item => {
              if (item.isSelected) {
                arr.push(item.biaoqian)
              }
            })
          }
        } catch (error) {}
      }
      return arr
    }
  },
  props: {
    detail: {
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/minxins.scss';
.recommend-pop {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
  }
  .cont {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 724rpx;
    height: 712rpx;
    transform: translate(-50%, -50%);
    z-index: 100;
    .share-btn {
      position: absolute;
      width: 370rpx;
      height: 85rpx;
      background-color: transparent;
      bottom: 98rpx;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .img {
      width: 724rpx;
      height: 712rpx;
    }
    .close {
      width: 90rpx;
      height: 90rpx;
      position: absolute;
      right: 20rpx;
      top: -100rpx;
    }
  }
}

.submit-cont {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  height: 90rpx;
  line-height: 90rpx;
  display: flex;
  .tel {
    flex: 2;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #f3f3f3;
    font-size: 35rpx;
    text-align: center;
    color: #358afe;
    .img-tel {
      margin-right: 20rpx;
      width: 50rpx;
      height: 48rpx;
      vertical-align: middle;
    }
  }
  .btn {
    flex: 3;
    height: 90rpx;
    line-height: 90rpx;
    background: $primary;
    color: #fff;
    font-size: 35rpx;
    border-radius: 0;
  }
}
.ayi-info {
  background-color: #fff;
  padding-left: 30rpx;
  position: relative;
  .recommend-tag {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
    line-height: 32rpx;
    color: #ff9000;
    font-size: 24rpx;
    .btn-share {
      color: #ff9000;
      font-size: 24rpx;
      background: #fff;
    }
    .icon-ques {
      display: inline-block;
      width: 32rpx;
      height: 32rpx;
      background-color: #ff9000;
      color: #fff;
      text-align: center;
      border-radius: 50%;
    }
  }
  .flex-box {
    display: flex;
    border-bottom: 1rpx solid #cdcdcd;
    .pic {
      padding: 25rpx 25rpx 25rpx 0;
      .img {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
    }
    .cont {
      flex: 1;
      @include alignCenter;
      font-size: 26rpx;
      .cont-title {
        margin-bottom: 20rpx;
        .big {
          font-size: 30rpx;
          padding-right: 20rpx;
        }
      }
    }
  }
  .tags {
    padding: 20rpx 0;
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
}
.ayi-detail {
  padding-top: 10rpx;
  .item {
    margin-bottom: 15rpx;
    line-height: 50rpx;
    padding: 20rpx 45rpx 20rpx 25rpx;
    font-size: 30rpx;
    background-color: #fff;
    .right-cont {
      float: right;
    }
  }
}
.ayi-cont {
  .item {
    margin-bottom: 15rpx;
    background: #fff;
    padding: 20rpx 25rpx;
    font-size: 30rpx;
    .sub-tit {
      padding: 10rpx 0;
      border-bottom: 1rpx solid #cdcdcd;
      margin-bottom: 10rpx;
    }
    .cont {
      line-height: 1.6;
    }
    .cont-img {
      .img-item {
        float: left;
        width: 120rpx;
        height: 120rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        // background: red;
        .img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.login-see {
  padding: 40rpx 0;
  text-align: center;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-right: 20rpx;
    width: 44rpx;
    height: 48rpx;
  }
}
</style>

