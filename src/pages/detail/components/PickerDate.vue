<template>
  <div>
    <picker @change="pcikerChange" :value="date" :start="startDate" :end="endDate" class="input-block" mode="date">
      <div class="pick-view">
        {{date}}
        <div style="display:inline-block;margin-left:10rpx;">
          <div v-show="countDay>0">
            共
            <span style="color:red">{{countDay}}</span>
            天
          </div>
        </div>
        <img class="picker-icon-date" src="../../../assets/images/yuyue/yyriqi.png" alt>
      </div>
    </picker>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      date: dayjs().format('YYYY-MM-DD')
      // start: '',
      // end: ''
    }
  },
  computed: {
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
  mounted() {
    this.setDefault()
  },
  methods: {
    setDefault() {
      if (this.defaultValue) {
        this.date = this.defaultValue
      }
      this.emitEvent()
    },
    pcikerChange(e) {
      this.date = e.mp.detail.value
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('input', this.date)
      this.$emit('change', this.date)
    }
  },
  watch: {
    defaultValue(to) {
      // console.log(to)
      this.setDefault()
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

