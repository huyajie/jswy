<template>
  <div class="lottery-bg lattery">
    <div class="active-rule" @click="goRule">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_02.png" alt />
    </div>
    <swiper class="swipe" :vertical="true" :autoplay="true" :interval="3000">
      <swiper-item v-for="(item,index) in tipTel" :key="index">
        <div class="tip-tel">
          <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_01.png" alt />
          {{item}}
        </div>
      </swiper-item>
    </swiper>

    <!-- <div class="tip-tel">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_01.png" alt />
      {{tipTel}}
    </div>-->
    <div class="title">
      <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lx_choujiang_03.png" alt />
    </div>
    <!-- <div class="count">
      <div class="text">
        您还有
        <span class="num">{{hasCount}}</span>
        次免费抽奖机会，电脑等你来拿
      </div>
    </div>-->
    <div class="lottery-cont">
      <div class="go-btn" @click="rotate">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/go.png" alt />
      </div>
      <div class="lottery-img" :animation="animation">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/lottery.jpg" alt />
      </div>
      <div class="lottery-foot-img">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/foot.jpg" alt />
        <p class="text" @click="goUserPrize">我的奖品 &gt;</p>
      </div>
    </div>

    <div class @touchmove.stop v-show="showPop">
      <div class="mask" @click="closePop"></div>
      <div class="share" v-show="isShare">
        <img class="img" mode="aspectFit" src="../../../assets/images/lottery/yaoqing.jpg" alt />
      </div>
      <div class="pop-msg" v-show="!isShare">
        <div class="cont">
          <div class="over" v-show="isOver">
            <p class="text">今日抽奖已达上限~</p>
            <p class="again">明日在来抽奖吧</p>
          </div>
          <div class="result" v-show="resultPop">
            <p class="text">很遗憾未抽中~</p>
            <button class="btn">再抽一次</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'
import share from './share'
import { lotteryList } from './data'
import { parms } from './param'
export default {
  data() {
    return {
      animation: null,
      count: 1,
      hasCount: 2,
      showPop: false,
      isOver: false,
      resultPop: false,
      isShare: false,
      tipTel: '',
      isFrist: true,
      isDisabled: false
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    let arr = [...lotteryList]
    this.shuffle(arr)
    this.tipTel = arr
    // console.log(arr)
    // this.animation = mpvue.createAnimation({
    //   duration: 5000,
    //   timingFunction: 'ease'
    // })
    // console.log(this.animation)
  },
  methods: {
    closePop() {
      this.showPop = false
      this.isOver = false
      this.resultPop = false
      this.isShare = false
    },
    shuffle(arr) {
      let i = arr.length
      while (i) {
        let j = Math.floor(Math.random() * i--) //5555
        ;[arr[j], arr[i]] = [arr[i], arr[j]]
      }
    },

    random() {
      return Math.floor(Math.random() * 73)
    },
    rotate() {
      if (!Auth.checkLogin()) {
        return false
      }
      if (this.isDisabled) {
        return
      }
      // if (this.hasCount <= 0) {
      //   this.showPop = true
      //   this.isOver = true
      //   return false
      // }

      // let parms = {
      //   apiKey: '51baomu',
      //   version: '1.0',
      //   clientId: '111',
      //   reqId: '1',
      //   reqTime: '1561538290018',
      //   dataType: 'json',
      //   data: {
      //     chongzhika_huodong_id: '3041',
      //     shoujihao: Auth.getInfo('shoujihao'),
      //     guanggaozuid: '0',
      //     laiyuan: '家事无忧微信小程序'
      //   },
      //   sign: '1',
      //   token: 'login'
      // }
      console.log(parms)
      this.isDisabled = true

      this.$http.post('https://api.51baomu.cn/v1/Huodong/Zhuanpanchoujiang', parms).then(res => {
        console.log(res)
        // this.hasCount--
        this.start(5)
      })
      // this.$http.post('http://api.51baomu.cn/v1/Huodong/Zhuanpanchoujiang')
    },
    start(step) {
      let _this = this
      this.animation = mpvue.createAnimation({
        duration: 5000,
        timingFunction: 'ease-out'
      })
      let result = this.getResult(step)
      let rotate = 1800 * this.count + this.getLottery(result.num)
      this.count++
      this.animation.rotate(rotate).step()
      this.animation = this.animation.export()
      this.animation.t = +new Date()
      setTimeout(() => {
        this.isDisabled = false
        mpvue.showModal({
          title: '恭喜您',
          content: '获得' + result.txt,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              if (_this.isFrist) {
                _this.showPop = true
                _this.isShare = true
                _this.isFrist = false
              }
            }
          }
        })
      }, 5010)
    },
    getResult(step) {
      let arr = [
        { num: 7, txt: '苹果笔记本电脑' },
        { num: 3, txt: '无线吸尘器' },
        { num: 2, txt: '商城立减100' },
        { num: 6, txt: '商城立减50' },
        { num: 8, txt: '家政抵扣券200元' },
        { num: 1, txt: '商城满50减8' },
        { num: 5, txt: '商城满100减18' },
        { num: 4, txt: '商城满20减3' }
      ]
      return arr[step - 1]
      //       1、苹果笔记本电脑

      // 2、无线吸尘器

      // 3、商城立减100

      // 4、商城立减50

      // 5、家政抵扣券200元

      // 6、商城满50减8

      // 7、商城满100减18

      // 8、商城满20减3
    },
    getLottery(step) {
      // let random = Math.floor(Math.random() * 8)
      // console.log(random)
      return 45 * step
    },
    goRule() {
      this.$router.navigateTo({
        url: '/pages/package/lotteryRule/main'
      })
    },
    goUserPrize() {
      if (!Auth.checkLogin()) {
        return false
      }
      this.$router.navigateTo({
        url: '/pages/package/userPrize/main'
      })
    }
  },
  onShareAppMessage() {
    return share()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/backgroundImage.scss';
.swipe {
  height: 60rpx;
}
.lottery-cont {
  position: relative;
  margin-top: 14rpx;
  .lottery-img {
    width: 688rpx;
    height: 688rpx;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    .img {
      width: 688rpx;
      height: 688rpx;
      display: block;
    }
  }
  .lottery-foot-img {
    margin-top: -88rpx;
    position: relative;
    .text {
      position: absolute;
      left: 50%;
      bottom: 60rpx;
      transform: translate(-50%, 0);
      color: #fff;
    }
    .img {
      width: 723rpx;
      height: 321rpx;
      margin: 0 auto;
      display: block;
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
    top: -2rpx;
    right: 20rpx;
    z-index: 9;
    .img {
      width: 95rpx;
      height: 104rpx;
    }
  }
  .tip-tel {
    padding-top: 12rpx;
    padding-bottom: 12rpx;
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
.mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
}
.share {
  .img {
    width: 440rpx;
    height: 398rpx;
    position: fixed;
    z-index: 100;
    top: 0;
    right: 120rpx;
  }
}
.pop-msg {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .cont {
    width: 600rpx;
    box-sizing: border-box;
    padding: 80rpx 60rpx;
    background-color: #fff;
    border-radius: 30rpx;
    .result {
      text-align: center;
      .text {
        font-size: 40rpx;
        font-weight: 100;
      }
      .btn {
        margin-top: 40rpx;
        display: block;
        width: 100%;
        height: 80rpx;
        font-size: 35rpx;
        color: #fff;
        background: #0ab727;
        border-radius: 40rpx;
      }
    }
    .over {
      text-align: center;
      .text {
        font-size: 32rpx;
      }
      .again {
        padding-top: 30rpx;
        font-size: 38rpx;
        font-weight: bold;
        color: #f00;
      }
    }
  }
}
</style>