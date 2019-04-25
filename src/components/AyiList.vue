<template>
  <div>
    <ul class="r-list">
      <li class="list-item" v-for="item in lists" :key="item.id">
        <div class="pic">
          <img class="img" :src="item.photo ? item.photo : defaultHead" alt>
        </div>
        <div class="cont">
          <div>
            <p class="cont-title">
              {{item.xingming}}
              <span class="age">{{item.age || ''}}岁</span>
            </p>
            <div class="tags">
              <block v-for="(item1 ,subIndex) in item.zhiyeyoushiArr" :key="item1">
                <span class="tag" v-if="subIndex<3">{{item1}}</span>
              </block>

              <!-- <span class="tag">做饭</span> -->
              <!-- <span class="tag">做饭做饭</span> -->
            </div>
            <p class="cont-detail">
              {{item.jiguan}}
              <span class="cont-line">|</span>
              {{item.xueli}}
            </p>
          </div>
        </div>
        <div class="button-box">
          <button class="button" @click="goDetail(item)">预约</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
const defaultHead = require('@/assets/images/list/default_head.jpg')
export default {
  data() {
    return {
      defaultHead: defaultHead
    }
  },
  computed: {
    lists() {
      // let arr = []
      this.list.forEach(item => {
        if (Object.prototype.toString.call(item) !== '[object Object]') {
          return false
        }
        if (!item.zhiyeyoushiArr) {
          let tmpArr = []
          try {
            let zyys = JSON.parse(item.zhiyeyoushi)
            // console.log(zyys)
            if (zyys) {
              zyys.forEach(item1 => {
                if (item1.isSelected) {
                  tmpArr.push(item1.biaoqian)
                }
              })
            }
          } catch (error) {}
          item.zhiyeyoushiArr = tmpArr
        }
        if (!item.age) {
          let ayiBirthday = dayjs(item.shengri)
          if (ayiBirthday.isValid()) {
            item.age = dayjs().diff(ayiBirthday, 'year')
            // return dayjs(this.detail.shengri).format('YYYY-MM-DD')
          } else {
            item.age = ''
          }
        }
      })
      // console.log(this.list)
      return this.list
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: 'simple'
    }
  },
  methods: {
    goDetail(item) {
      if (item.id) {
        if (getCurrentPages && getCurrentPages().length >= 9) {
          this.$router.redirectTo({
            url: `/pages/ayidetail/main?id=${item.id}`
          })
        } else {
          this.$router.navigateTo({
            url: `/pages/ayidetail/main?id=${item.id}`
          })
        }
      }
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/minxins.scss';
.r-list {
  .list-item {
    display: flex;
    margin-bottom: 10rpx;
    background: #fff;
    .pic {
      width: 120rpx;
      height: 120rpx;
      padding: 30rpx 10rpx 30rpx 20rpx;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .cont {
      flex: 1;
      @include alignCenter;
      .cont-title {
        font-size: 30rpx;
        .age {
          padding-left: 20rpx;
        }
      }
      .tags {
        padding: 10rpx 0;
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
      .cont-detail {
        font-size: 24rpx;
        .cont-line {
          padding: 0 5rpx;
          color: #999;
          font-size: 20rpx;
        }
      }
    }
    .button-box {
      padding-right: 20rpx;
      @include alignCenter;
      .button {
        width: 105rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 28rpx;
        color: #fff;
        background: $primary;
        border-radius: 10rpx;
      }
    }
  }
}
</style>

