<template>
  <div class="invite-list">
    <div class="title">
      <img class="img" mode="aspectFit" src="../../../assets/images/invite/yaoqing_03.png" alt>
    </div>
    <div class="table">
      <div class="tr">
        <div class="th">好友</div>
        <div class="th">状态</div>
        <div class="th">已奖励金额</div>
      </div>
      <div class="tr" v-for="item in list" :key="item.id">
        <div class="td">{{item.guphone}}</div>
        <template v-if="item.ticheng==null">
          <div class="td">未签约</div>
          <div class="td">0</div>
        </template>
        <template v-else>
          <div class="td">已签约</div>
          <div class="td">
            <span class="red">{{item.ticheng}}</span>
          </div>
        </template>
      </div>
      <!-- <div class="tr">
        <div class="td">138****000</div>
        <div class="td">未签约</div>
        <div class="td">0</div>
      </div>
      <div class="tr">
        <div class="td">138****000</div>
        <div class="td">未签约</div>
        <div class="td">
          <span class="red">200</span>
        </div>
      </div>-->
      <div class="tr sum">
        <div class="td"></div>
        <div class="td"></div>
        <div class="td">
          <span class="red">{{total}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    total() {
      let tt = this.list.reduce((a, b) => {
        return a + (b.ticheng ? b.ticheng : 0)
      }, 0)
      return tt
    }
  },
  onLoad() {
    this.getData()
  },
  onShow() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('TuijianList').then(res => {
        // console.log(JSON.stringify(res.data))
        if (res.ret === 0) {
          this.list = res.data
        }
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 20rpx;
  .tr {
    display: flex;
    padding: 10rpx 0;
    .th,
    .td {
      flex: 1;
      display: flex;
      min-height: 60rpx;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      .red {
        color: #fd0100;
      }
    }
    .th {
      font-size: 26rpx;
    }
    &:nth-child(2n):not(.sum) {
      background: #eee;
    }
    &.sum {
      border-top: 1rpx solid #eee;
      margin-top: 10rpx;
      padding-top: 10rpx;
    }
  }
}
.invite-list {
  margin-top: 10rpx;
  background: #fff;
  padding-left: 20rpx;
  padding-bottom: 40rpx;
  .title {
    border-bottom: 1rpx solid #dcdcdc;
    height: 120rpx;
    padding-top: 40rpx;
    box-sizing: border-box;
    text-align: center;
    .img {
      width: 345rpx;
      height: 45rpx;
    }
  }
}
</style>

