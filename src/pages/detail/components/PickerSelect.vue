<template>
  <div>
    <picker :disabled="disabled" @change="pcikerChange" class="input-block" :value="index" :range="ranges">
      <div class="pick-view">
        {{c_value}}
        <img class="picker-icon-arrew" src="../../../assets/images/yuyue/yyxiala.png" alt>
      </div>
    </picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      ranges: []
    }
  },
  computed: {
    c_value() {
      // console.log(this.value)
      return this.value
    }
  },
  props: {
    value: {},
    disabled: {
      default: false
    },
    range: {
      type: Array,
      default: []
    },
    prop: {
      type: Object,
      default: {
        key: 'display'
      }
    }
  },
  mounted() {
    this.setRanges()
  },
  methods: {
    setRanges() {
      let tmpArr = []
      this.range.forEach(element => {
        if (typeof element === 'string') {
          tmpArr.push(element)
        }
        if (element.constructor === Object) {
          tmpArr.push(element[this.prop.key])
        }
      })
      this.ranges = tmpArr
      // console.log(this.ranges)
      // console.log(this.c_value)
      let index = this.ranges.indexOf(this.value)
      index = index > -1 ? index : 0
      // console.log(index)

      this.index = index
      // this.$forceUpdate()
      this.emitEvent()
    },
    pcikerChange(e) {
      this.index = e.mp.detail.value
      this.emitEvent()
    },
    emitEvent() {
      if (this.range.length) {
        // console.log(this.ranges[this.index])
        this.$emit('input', this.ranges[this.index])
        this.$emit('change', this.range[this.index])
      }
    }
  },
  watch: {
    range(to, form) {
      // console.log(to)
      this.setRanges()
    },
    value(to) {
      // console.log(to)
      this.setRanges()
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
</style>

