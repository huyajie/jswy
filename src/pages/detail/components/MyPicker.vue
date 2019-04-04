<template>
  <div>
    <div class="picker-title" @click="showModal = true">{{currentVal}}</div>

    <div class="picker-modal" v-if="showModal">
      <div class="picker-mask" @click="cancelEvent" :class="showModal ? 'datepicker-animation-fade-in':''"></div>
      <div class="picker-cont" :class="showModal ? 'datepicker-animation-slide-up':''">
        <div class="picker-header">
          <div class="picker-header-btn cance" @click="cancelEvent">取消</div>
          <div class="picker-header-title"></div>
          <div class="picker-header-btn confirm" @click="confirmEvent">确定</div>
        </div>
        <picker-view :value="c_value" @change="onChange">
          <picker-view-column v-for="(item,index) in c_range" :key="index">
            <div v-for="(subItem,subIndex) in item" :index="subIndex" :key="subItem">{{subItem}}</div>
          </picker-view-column>
          <!-- <picker-view-column>
            <view>2013</view>
            <view>2014</view>
          </picker-view-column>
          <picker-view-column>
            <view>春</view>
            <view>夏</view>
          </picker-view-column>-->
        </picker-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      pickerEvent: ''
    }
  },
  computed: {
    currentVal() {
      let arr = []
      let arr2 = []
      this.c_value.forEach((item, index) => {
        if (index < 3) {
          arr.push(this.c_range[index][item])
        } else {
          arr2.push(this.c_range[index][item])
        }
      })
      return arr.join('-') + ' ' + arr2.join(':')
    },
    c_value: {
      get() {
        return this.value
      }
    },
    c_range() {
      return this.range
    }
  },
  props: {
    value: {},
    range: {}
  },
  mounted() {
    console.log(this.range)
  },
  methods: {
    onChange(e) {
      this.$emit('columnchange', e)
      // this.c_value = e.mp.detail.value
      console.log(e)
    },
    confirmEvent() {
      this.$emit('change', {
        mp: {
          detail: {
            value: this.c_value
          }
        }
      })
      this.showModal = false
    },
    showModalEvent() {
      mpvue.datePicker({
        format: 'yyyy-MM-dd hh:mm',
        currentDate: '2012-12-12',
        startDate: '2012-12-10',
        endDate: '2012-12-15',
        success: res => {
          mpvue.alert({
            content: res.date
          })
        }
      })
    },
    cancelEvent() {
      this.showModal = false
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-title {
  display: block;
  height: 100%;
}

.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  .picker-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .picker-cont {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
  .picker-header {
    height: 100rpx;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ccc;
    .picker-header-title {
      flex: 1;
    }
    .picker-header-btn {
      width: 120rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #4d7af4;
      font-size: 36rpx;
    }
  }
}

.datepicker-animation-fade-in {
  animation: fadeIn ease 0.3s forwards;
}
.datepicker-animation-fade-out {
  animation: fadeOut ease 0.3s forwards;
}
.datepicker-animation-slide-up {
  animation: slideUp ease 0.3s forwards;
}
.datepicker-animation-slide-down {
  animation: slideDown ease 0.3s forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>

