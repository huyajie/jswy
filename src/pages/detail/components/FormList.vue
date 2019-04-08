<template>
  <div>
    <div class="form-group">
      <!-- 所在城市 -->
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-8rpx;" src="../../../assets/images/yuyue/yyicon01.png" alt>
        </div>
        <div class="form-label">所在城市:</div>
        <div class="form-value">
          <picker-select :range="city" :prop="{key:'display'}" v-model="parms.suozaichengshi"></picker-select>
        </div>
      </div>
      <!-- 服务类型 -->
      <div class="form-item">
        <div class="form-icon">
          <img class="img" src="../../../assets/images/yuyue/yyicon02.png" alt>
        </div>
        <div class="form-label">服务类型:</div>
        <div class="form-value">
          <picker-select :disabled="true" @change="changeEvent" :range="serviceType" :prop="{key:'DISPLAY'}" v-model="parms.fuwuleixing"></picker-select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <!-- 开始时间 -->
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-8rpx;" src="../../../assets/images/yuyue/yyicon03.png" alt>
        </div>
        <div class="form-label">开始时间:</div>
        <div class="form-value">
          <picker-date-time v-if="currentService === 'xiaoshigong'" v-model="parms.kaishishijian"></picker-date-time>
          <picker-date v-else @change="pickStartDateChange" v-model="parms.kaishishijian"></picker-date>
        </div>
      </div>
      <!-- 结束时间 -->
      <template v-if="currentService === 'hugong'">
        <div class="form-item">
          <div class="form-icon">
            <img class="img" style="margin-top:-8rpx;" src="../../../assets/images/yuyue/yyicon03.png" alt>
          </div>
          <div class="form-label">服务时长:</div>
          <div class="form-value">
            <picker-date ref="endDate" :start="endBeginTime" :day="serviceTime" v-model="parms.jieshushijian"></picker-date>
          </div>
        </div>
      </template>
      <!-- 小时工服务时长 -->
      <template v-if="currentService === 'xiaoshigong'">
        <div class="form-item">
          <div class="form-icon">
            <img class="img" style="margin-top:-8rpx;" src="../../../assets/images/yuyue/yyicon04.png" alt>
          </div>
          <div class="form-label">服务时长:</div>
          <div class="form-value">
            <div class="number-stepper">
              <img @click="stepHour(-1)" class="img-step" src="../../../assets/images/yuyue/yyjian.png">
              <div class="text">{{hourTime}}小时</div>
              <img @click="stepHour(1)" class="img-step" src="../../../assets/images/yuyue/yyjia.png">
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="form-group">
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-6rpx" src="../../../assets/images/yuyue/yyicon05.png" alt>
        </div>
        <div class="form-label">联系人:</div>
        <div class="form-value">
          <input class="input-block" v-model.lazy="parms.lianxiren" type="text">
        </div>
      </div>
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-6rpx" src="../../../assets/images/yuyue/yyicon06.png" alt>
        </div>
        <div class="form-label">联系电话:</div>
        <div class="form-value">
          <input class="input-block" v-model.lazy="parms.lianxidianhua" type="text">
        </div>
      </div>
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-6rpx" src="../../../assets/images/yuyue/yyicon07.png" alt>
        </div>
        <div class="form-label">服务地址:</div>
        <div class="form-value">
          <input class="input-block" v-model.lazy="parms.fuwudizhi" type="text">
        </div>
      </div>
      <template v-if="currentService === 'hugong'">
        <div class="form-item">
          <div class="form-value">
            <div class="tags">
              <div @click="slectNursing(index)" class="tag" :class="nursingType == index ? 'active' : ''" v-for="(item,index) in nursingList" :key="index">{{item}}</div>
              <!-- <div class="tag">到医院护理</div>
              <div class="tag">到家护理</div>-->
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="form-group other">
      <div class="form-item">
        <div class="form-icon">
          <img class="img" style="margin-top:-8rpx;" src="../../../assets/images/yuyue/yyicon08.png" alt>
        </div>
        <div class="form-label">其他需求:</div>
        <div class="form-value">
          <input class="input-block" v-model.lazy="parms.qitaxuqiu" type="text">
        </div>
      </div>
    </div>
    <div class="tips">
      说明：各城市价格不同，查看
      <span class="link">各城市收费标准</span>
    </div>
    <div class="submit-box">
      <button class="submit" :class="isSubmit?'disabed' :''" :disabled="isSubmit" :loading="isSubmit" @click="submit">立即预约</button>
    </div>
  </div>
</template>

<script>
import PickerSelect from './PickerSelect'
import PickerDate from './PickerDate'
import PickerDateTime from './PickerDateTime'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      isSubmit: false, //提交按钮 loading  防止连点
      // currentService:'',//当前服务
      hourTime: 2, //小时工服务时长
      nursingType: 0, //护理方式  默认到医院护理
      nursingList: ['到医院护理', '到家护理'],
      endBeginTime: dayjs().format('YYYY-MM-DD'),
      parms: {
        suozaichengshi: '',
        fuwuleixing: '',
        kaishishijian: '',
        jieshushijian: '',
        lianxiren: '',
        lianxidianhua: '',
        fuwudizhi: '',
        fuwufangshi: '',
        qitaxuqiu: '',
        fuwushichang: ''
      },
      array: ['中国', '美国', '巴西', '日本']
    }
  },
  computed: {
    serviceTime() {
      return dayjs(this.parms.jieshushijian).diff(dayjs(this.parms.kaishishijian), 'day')
    },
    currentService() {
      let obj = this.serviceType.find(item => {
        return item.DISPLAY === this.parms.fuwuleixing
      })
      // console.log(obj.RETURNED)
      return obj ? obj.RETURNED : ''
    },
    serviceType() {
      return this.$store.state.select.serviceType
    },
    city() {
      return this.$store.state.select.city
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())

    let $mp = this.$root.$mp
    // console.log($mp)
    if ($mp.query.type) {
      this.parms.fuwuleixing = $mp.query.type
    }
    this.$store.dispatch('GET_CITY')
  },
  methods: {
    // 选择开始日期
    pickStartDateChange(e) {
      console.log(e)
      this.endBeginTime = e
    },
    // 服务类型 改变
    changeEvent(e) {
      // console.log(e)
      // this.currentService = e.RETURNED
    },
    // 提交表单
    submit() {
      // let a = this.$refs.startDate
      console.log(this.parms)
      let parm = Object.assign({}, this.parms)
      if (this.currentService === 'xiaoshigong') {
        parm.fuwushichang = `${this.hourTime}`
        let diffCont = dayjs(`${parm.kaishishijian}:00`).diff(dayjs(), 'hour')
        if (diffCont < 2) {
          this.$utils.showError('需至少提前2小时预约，请重新选择服务时间')
          console.log('需至少提前2小时预约，请重新选择服务时间')
          return false
        }
      }
      if (this.currentService === 'hugong') {
        parm.fuwushichang = `${this.serviceTime}`
        parm.fuwufangshi = this.nursingType == 0 ? '到医院护理' : '到家护理'
      }
      if (parm.lianxidianhua === '') {
        this.$utils.showError('手机号码不能为空')
        return false
      }
      let regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|6|7|8]|18[0-9])\d{8}$/
      if (!regMobile.test(parm.lianxidianhua)) {
        this.$utils.showError('请输入正确的手机号')
        return false
      }
      this.isSubmit = true
      this.$http.post('yuyue', parm).then(
        res => {
          this.isSubmit = false
          let state = ''
          if (res.ret === 0) {
            state = 1
          } else {
            state = 2
          }
          this.$router.navigateTo({
            url: `/pages/orderResult/main?state=${state}`
          })
          // console.log(this.isSubmit)
          // wx.navigateTo({
          //   url: `../orderSuc/orderSuc?state=${state}`
          // })
        },
        err => {
          this.isSubmit = false
        }
      )
      console.log(parm)
    },
    // 小时加减
    stepHour(step) {
      if (this.hourTime + step <= 0 || this.hourTime + step > 24) {
        return false
      }
      this.hourTime += step
    },
    //选择护理方式
    slectNursing(index) {
      this.nursingType = index
    }
  },
  components: {
    PickerSelect,
    PickerDate,
    PickerDateTime
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/minxins.scss';
@import '@/assets/scss/variables.scss';
$borderColor: #d9d9d9;
$formItemHeight: 88rpx;
.form-group {
  &.other {
    padding-top: 25rpx;
    padding-bottom: 25rpx;
  }
  background: #ffffff;
  border-top: 1rpx solid $borderColor;
  border-bottom: 1rpx solid $borderColor;
  padding-left: 30rpx;
  margin: 20rpx 0;
  .form-item {
    font-size: 30rpx;
    display: flex;
    border-bottom: 1rpx solid $borderColor;
    &:last-child {
      border: none;
    }
    .form-icon {
      width: 70rpx;
      @include alignCenter;
      .img {
        width: 50rpx;
        height: 50rpx;
      }
    }
    .form-label {
      width: 140rpx;
      line-height: $formItemHeight;
    }
    .form-value {
      flex: 1;
      // height: $formItemHeight;
      position: relative;
      line-height: $formItemHeight;
      .number-stepper {
        display: flex;
        width: 228rpx;
        line-height: 88rpx;
        .text {
          flex: 1;
          text-align: center;
        }
        .img-step {
          display: block;
          width: 36rpx;
          height: 36rpx;
          margin-top: 26rpx;
        }
      }
      //  兼容支付宝小程序
      input.input-block {
        margin-top: 2rpx;
        height: 84rpx;
        line-height: 84rpx;
      }
      .input-block {
        height: $formItemHeight;
        line-height: $formItemHeight;
        position: relative;
        padding: 0;
        display: block;
        border: none;
      }
      .pick-view {
        height: $formItemHeight;
        position: relative;
      }
      .picker-icon-arrew {
        position: absolute;
        top: 34rpx;
        right: 20rpx;
        width: 20rpx;
        height: 14rpx;
      }
      .picker-icon-date {
        position: absolute;
        width: 34rpx;
        height: 34rpx;
        right: 13rpx;
        top: 27rpx;
      }
    }
    .tags {
      .tag {
        display: inline-block;
        font-size: 24rpx;
        line-height: 50rpx;
        height: 50rpx;
        padding: 0 20rpx;
        margin-right: 20rpx;
        border-radius: 6rpx;
        box-sizing: border-box;
        border: 1px solid #d8d8d8;
        color: #666;
        &.active {
          border-color: #42be9c;
          color: #333;
        }
      }
    }
  }
}
.tips {
  padding-left: 30rpx;
  font-size: 25rpx;
  .link {
    color: $primary;
  }
}
.submit-box {
  padding: 20rpx 30rpx;
  .submit {
    background-color: $primary;
    color: #fff;
    border-radius: 8rpx;
    font-size: 30rpx;
    &.disabed {
      background-color: #999;
    }
    &.button-hover {
      background-color: $primary;
      opacity: 0.7;
    }
  }
}
</style>

