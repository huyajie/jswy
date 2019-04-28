<template>
  <div>
    <div class="filter-wrap">
      <div class="filter">
        <ul class="list">
          <li class="item" @click="filterTitleClick( index )" v-for="(item,index) in filterDataTitle" :key="index">
            {{item.currentIndex ==0 ? item.title: item.data[item.currentIndex]}}
            <i class="icon-arrew"></i>
          </li>
          <li class="item" @click="filterTitleClick(-1)">筛选</li>
        </ul>
      </div>
    </div>
    <div class="aslide" v-show="aslide">
      <div class="aslide-mask" @click="slideOut()" :class="aslide ? 'animated fadeIn' : ''"></div>
      <div class="aslide-wrap" v-if="aslide" :class="aslide ? 'animated slideInRight faster' : ''">
        <scroll-view scroll-y style="height:100%">
          <div class="filter-cont">
            <div class="item" v-for="(item,index) in filterData" :key="index" v-show="popShowIndex ==index || popShowIndex===-1 ">
              <div class="sub-title">
                <div class="more" @click="showMore(index)">
                  {{ item.isHide ? '全部' : '收起'}}
                  <span class="arrew" :class="item.isHide ? '' : 'on'"></span>
                </div>
                {{item.title}}
              </div>
              <ul class="tags clearfix" :class="item.isHide ? 'hide' : ''">
                <li class="tag" v-for="(subItem,subIndex) in item.data" :key="subIndex">
                  <div class="tag-inner" @click="selTag(index,subIndex)" :class="item.currentIndex== subIndex ? 'active' : ''">{{subItem}}</div>
                </li>
              </ul>
            </div>
            <!-- <div class="item">
              <div class="sub-title">
                <div class="more">
                  全部
                  <span class="arrew"></span>
                </div>类型
              </div>
              <ul class="tags clearfix hide">
                <li class="tag">
                  <div class="tag-inner active">住家保姆</div>
                </li>
                <li class="tag">
                  <div class="tag-inner">不住家保姆</div>
                </li>
                <li class="tag">
                  <div class="tag-inner">月嫂</div>
                </li>
                <li class="tag">
                  <div class="tag-inner">育儿嫂</div>
                </li>
                <li class="tag">
                  <div class="tag-inner">长期小时工</div>
                </li>
              </ul>
            </div>-->
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popShowIndex: -1,
      aslide: false,
      topShowIndex: [],
      filterData: [
        {
          title: '城市',
          isHide: true,
          pName: 'chengshi',
          currentIndex: 0,
          data: ['不限']
        },
        {
          title: '类型',
          isHide: true,
          pName: 'leixing',
          currentIndex: 0,
          data: ['不限', '住家保姆', '不住家保姆', '月嫂', '育儿嫂', '小时工']
        },
        {
          title: '年龄',
          isHide: true,
          pName: 'nianling',
          currentIndex: 0,
          data: ['不限', '20以下', '20-29', '30-39', '40-49', '50以上']
        },
        {
          title: '工资',
          isHide: true,
          pName: 'gongzi',
          currentIndex: 0,
          data: [
            '不限',
            '1000～2999',
            '3000～4999',
            '5000～6999',
            '7000～8999',
            '9000～10999',
            '11000～12999',
            '13000～14999',
            '15000以上'
          ]
        },
        {
          title: '籍贯',
          isHide: true,
          titleHide: true,
          pName: 'jiguan',
          currentIndex: 0,
          data: ['不限']
        }
      ]
    }
  },
  computed: {
    filterDataTitle() {
      return this.filterData.filter(item => {
        return !item.titleHide
      })
    }
  },
  mounted() {
    // this.filterData.forEach((item, index) => {
    //   this.topShowIndex.push(0)
    // })
    // console.log(this.$store.state.list.queryType)
    this.setType(this.$store.state.list.queryType)
    const p = Promise.all([this.$http.get('regions/86'), this.$store.dispatch('GET_CITY')])

    p
      .then(res => {
        console.log(res)
        if (res[0].ret === 0) {
          let arr = ['不限']
          res[0].data.forEach(element => {
            arr.push(element.display)
          })
          this.filterData[4].data = arr
        }
        if (res[1].length > 0) {
          let arr2 = ['不限']
          res[1].forEach(element => {
            arr2.push(element.display)
          })
          this.filterData[0].data = arr2
        }
        this.$emit('filter-change', this.filterData)

        // console.log(11)
        if (res[0].ret !== 0 || res[1].ret !== 0) {
        }
      })
      .catch(err => {
        // console.log(err)
        this.$emit('filter-change', this.filterData)
      })
    // this.$http.get('regions/86').then(res => {
    //   if (res.ret === 0) {
    //     let arr = ['不限']
    //     res.data.forEach(element => {
    //       arr.push(element.display)
    //     })
    //     this.filterData[0].data = arr
    //   }
    //   this.$emit('filter-change', this.filterData)
    //   // console.log(res)
    // })

    // this.$store.dispatch('GET_CITY').then(res => {
    //   console.log(res)
    //   let arr = ['不限']
    //   res.forEach(element => {
    //     arr.push(element.display)
    //   })
    //   this.filterData[0].data = arr
    //   this.$emit('filter-change', this.filterData)
    // })
  },
  onShow() {
    // console.log(this.$store.state.list.queryType)
    this.setType(this.$store.state.list.queryType, true)
  },
  methods: {
    // 侧边栏画出时根据index  显示不同得 选项
    filterTitleClick(index) {
      this.popShowIndex = index
      if (index > -1) {
        this.filterData[index].isHide = false
      }
      this.slideIn()
    },
    showMore(index) {
      this.filterData[index].isHide = !this.filterData[index].isHide
    },
    /**
     * 设置类型
     */
    setType(type, isOnShow) {
      if (type == '') {
        return false
      }
      this.filterData.forEach(item => {
        if (item.currentIndex > 0) {
          item.currentIndex = 0
        }
      })
      let index = this.filterData[1].data.findIndex(item => {
        return item === type
      })
      this.filterData[1].currentIndex = index > -1 ? index : 0
      this.$store.commit('CHANGE_QUERYTYPE', '')
      if (isOnShow) {
        this.$emit('filter-change', this.filterData)
      }
      // console.log(index)
    },
    selTag(index, subIndex) {
      if (this.filterData[index].currentIndex === subIndex) {
        this.slideOut()
      } else {
        this.filterData[index].currentIndex = subIndex
        this.slideOut(1)
      }
    },
    slideIn() {
      this.aslide = true
      this.$emit('slide-in', this.aslide)
    },
    slideOut(type) {
      this.aslide = false
      this.$emit('slide-in', this.aslide)
      if (type === 1) {
        this.$emit('filter-change', this.filterData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/minxins.scss';
@import '@/assets/scss/variables.scss';
.filter-cont {
  padding: 20rpx 30rpx;
  .sub-title {
    font-size: 30rpx;
    line-height: 40rpx;
    padding: 20rpx 0;
    .more {
      float: right;
      font-size: 24rpx;
      color: #666;
      transition: 0.3s;
      .arrew {
        top: 6rpx;
        @include arrow(10rpx);
        transition: 0.3s;
        transform-origin: 50% 25%;
        &.on {
          transform: rotate(-180deg);
        }
      }
    }
  }
  .tags {
    margin-left: -20rpx;
    &.hide {
      height: 84rpx;
      overflow: hidden;
    }
    .tag {
      float: left;
      width: 33.3333%;
      box-sizing: border-box;
      padding-left: 20rpx;
      padding-bottom: 20rpx;
      .tag-inner {
        font-size: 24rpx;
        height: 64rpx;
        line-height: 62rpx;
        border-radius: 32rpx;
        text-align: center;
        padding: 0 10rpx;
        box-sizing: border-box;
        background: #eee;
        border: 1rpx solid #eee;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.active {
          border-color: $primary;
          color: $primary;
          background: #eafded;
        }
      }
    }
  }
}
.filter-wrap {
  height: 82rpx;
  .filter {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    height: 82rpx;
    line-height: 82rpx;
    background: #e5f7e8;
    .list {
      display: flex;
      padding: 0 20rpx;
      justify-content: space-between;
      .item {
        // flex: 1;
        overflow: hidden;
        @include alignCenter;
        font-size: 24rpx;
        .icon-arrew {
          display: inline-block;
          margin-top: 12rpx;
          margin-left: 3rpx;
          width: 0;
          height: 0;
          border: 12rpx solid transparent;
          border-top-color: #333;
          transform: scaleX(0.8);
        }
      }
    }
  }
}

.aslide {
  .aslide-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .aslide-wrap {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 14%;
    bottom: 0;
    right: 0;
    background: #fff;
  }
  .aslide-wrap {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 14%;
    bottom: 0;
    right: 0;
    background: #fff;
  }
}
</style>

