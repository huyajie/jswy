<template>
  <div :class=" openPop ? 'open-pop' :''">
    <filter @slide-in="slideInEvent" @filter-change="filterChange"></filter>
    <ayi-list :list="list"></ayi-list>
    <button class="is-loading" :loading="!loadState">{{loadState ? '暂时没有更多数据了':' 正在加载...'}}</button>
  </div>
</template>

<script>
import Filter from './components/Filter'
import AyiList from '@/components/AyiList.vue'
export default {
  data() {
    return {
      loadFinsh: false,
      openPop: false,
      list: [],
      // page: 0,
      total: 1,
      pageSize: 10,
      // allPage: 1,
      isLoaded: false,
      loadState: false, //是否加载完成
      parms: {
        page: 0,
        jiguan: '不限',
        leixing: '不限',
        nianling: '不限',
        gongzi: '不限'
      }
    }
  },
  components: {
    Filter,
    AyiList
  },
  computed: {
    allPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    slideInEvent($event) {
      this.openPop = $event
    },
    getData(type) {
      this.parms.page++
      if (this.parms.page > this.allPage) {
        this.loadState = true
        console.log('没有更多了')
        return false
      }
      this.isLoaded = true
      this.$http.get('ayis', this.parms).then(res => {
        this.isLoaded = false
        if (type === 1) {
          this.list = []
          // setTimeout(() => {
          mpvue.hideNavigationBarLoading()
          //   // 停止下拉动作
          mpvue.stopPullDownRefresh()
          // }, 500)
        }
        if (res.ret == 0) {
          if (res.data.results.length < this.pageSize) {
            this.loadState = true
          }
          this.total = res.data.count
          let tmpList = [...this.list, ...res.data.results]
          this.list = tmpList
        } else {
          this.loadState = true
        }

        console.log(res)
      })
    },
    reachBottom() {
      if (this.isLoaded) {
        return false
      }
      this.getData()
    },
    refresh() {
      mpvue.showNavigationBarLoading()
      this.resetParms()
      this.getData(1)
      // setTimeout(() => {
      //   // 隐藏导航栏加载框
      //   mpvue.hideNavigationBarLoading()
      //   // 停止下拉动作
      //   mpvue.stopPullDownRefresh()
      // }, 2000)
    },
    resetParms() {
      this.parms.page = 0
      this.total = 1
      this.loadState = false
    },
    filterChange(data) {
      // console.log(data)
      let tmpArr = []
      data.forEach(item => {
        this.parms[item.pName] = item.data[item.currentIndex]
        // tmpArr.push(item.data[item.currentIndex])
      })
      console.log(this.parms)
      this.resetParms()
      this.getData(1)
    }
  },
  mounted() {
    // this.getData()
  },
  onReachBottom() {
    this.reachBottom()
    console.log(1)
  },
  onPullDownRefresh: function() {
    this.refresh()
    // "enablePullDownRefresh": true,
    // "backgroundTextStyle": "dark"
    // 显示顶部刷新图标
  }
}
</script>

<style lang="scss" scoped>
.open-pop {
  height: 100vh;
  overflow: hidden;
}
.is-loading {
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  font-size: 28rpx;
  background: transparent;
  color: #333;
}
</style>

