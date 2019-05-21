<template>
  <div>
    <my-picker mode="multiSelector" @change="pcikerChange" @cancel="cancelEvent" :value="dateTime" @columnchange="changeDateTimeColumn($event,'my')" :range="dateTimeArray" v-if="plat!=='wx'"></my-picker>
    <picker v-else @change="pcikerChange" @cancel="cancelEvent" @columnchange="changeDateTimeColumn" :value="dateTime" :range="dateTimeArray" class="input-block" mode="multiSelector">
      <div class="pick-view">
        {{currentVal}}
        <img class="picker-icon-date" src="../../../assets/images/yuyue/yyriqi.png" alt>
      </div>
    </picker>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dateTimePicker from '@/utils/datePicker'
import MyPicker from './MyPicker'
export default {
  data() {
    return {
      plat: '',
      platform: '',
      dateTime: [],
      dateTimeSel: [],
      dateTimeArray: [],
      date: dayjs().format('YYYY-MM-DD')
      // start: '',
      // end: ''
    }
  },
  components: {
    MyPicker
  },
  computed: {
    isBaiDu() {
      if (this.platform === 'android' && this.plat === 'swan') {
        return true
      }
    },
    currentVal() {
      let arr = []
      let arr2 = []
      this.dateTimeSel.forEach((item, index) => {
        if (index < 3) {
          arr.push(this.dateTimeArray[index][item])
        } else {
          arr2.push(this.dateTimeArray[index][item])
        }
      })
      return arr.join('-') + ' ' + arr2.join(':')
    },
    startDate() {
      return this.start
    },
    endDate() {
      return this.end
    },
    countDay() {
      return this.day
    }
  },
  props: {
    day: {
      default: 0
    },
    defaultValue: {
      default: ''
    },
    start: {
      default: dayjs().format('YYYY-MM-DD')
    },
    end: {
      default: dayjs()
        .add(1, 'month')
        .format('YYYY-MM-DD')
    }
  },
  created() {
    this.plat = mpvuePlatform
    try {
      const result = mpvue.getSystemInfoSync()
      this.platform = result.platform
      // console.log(this.platform)
      console.log('getSystemInfoSync success', result)
    } catch (e) {
      console.log('getSystemInfoSync fail', e)
    }
  },
  onLoad() {
    // this.setDefault()
    var obj = dateTimePicker.dateTimePicker(dayjs().year(), dayjs().year() + 1)
    obj.dateTime.pop()
    obj.dateTimeArray.pop()
    for (let i = obj.dateTimeArray[3].length; i >= 0; i--) {
      if (obj.dateTimeArray[3][i] > 18 || obj.dateTimeArray[3][i] < 8) {
        obj.dateTimeArray[3].splice(i, 1)
      }
    }
    if (obj.dateTime[3] > 18) {
      obj.dateTime[3] = 10
    } else if (obj.dateTime[3] < 8) {
      obj.dateTime[3] = 0
    } else {
      obj.dateTime[3] -= 8
    }

    // if (mpvuePlatform === 'swan') {
    //   obj.dateTime.shift()
    //   obj.dateTimeArray.shift()
    // }

    this.dateTime = obj.dateTime
    this.dateTimeSel = [...obj.dateTime]
    this.dateTimeArray = obj.dateTimeArray
    this.emitEvent()
  },
  methods: {
    setDefault() {
      if (this.defaultValue) {
        this.date = this.defaultValue
      }
      this.emitEvent()
    },
    pcikerChange(e) {
      // this.date = e.mp.detail.value
      // console.log(e.mp.detail.value)
      this.dateTimeSel = [...this.dateTime]

      // console.log(dayjs(this.currentVal + ':00'))
      let diffCont = dayjs(`${this.currentVal}:00`).diff(dayjs(), 'hour')
      if (diffCont < 2) {
        this.$utils.showError('需至少提前2小时预约，请重新选择服务时间')
        console.log('需至少提前2小时预约，请重新选择服务时间')
      }
      this.emitEvent()
    },
    changeDateTimeColumn(e, plat) {
      // console.log(plat)
      let dateArr = this.dateTimeArray
      if (plat == 'my') {
        this.dateTime = e.mp.detail.value
      } else {
        this.dateTime[e.mp.detail.column] = e.mp.detail.value
      }
      let arr = this.dateTime
      let month = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
      this.$set(this.dateTimeArray, 2, month)
    },
    cancelEvent() {
      this.dateTime = [...this.dateTimeSel]
    },
    emitEvent() {
      this.$emit('input', this.currentVal)
      this.$emit('change', this.currentVal)
    }
  },
  watch: {
    defaultValue(to) {
      // console.log(to)
      // this.setDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
$formItemHeight: 88rpx;
.pick-view {
  height: $formItemHeight;
  position: relative;
  font-size: 30rpx;
  .picker-icon-date {
    position: absolute;
    width: 34rpx;
    height: 34rpx;
    right: 13rpx;
    top: 27rpx;
  }
}
</style>

