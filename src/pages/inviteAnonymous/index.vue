<template>
  <div class="wrap">
    <div class="banner">
      <img class="img" src="../../assets/images/invite/tuijian_banner.jpg" alt>
    </div>
    <div class="form-group">
      <div class="input-block" :class="{err:item.error}" v-for="(item,index) in form" :key="index">
        <input class="input" type="text" @focus="inputFocusEvt(index)" v-model="item.value" placeholder="请输入好友手机号">
        <div class="btn" :class="index === form.length-1 ? '':'del'" @click="opreat(index)">{{index === form.length-1 ? '增加':'删除'}}</div>
        <div class="error" v-show="item.error">{{item.isSelf ? '您' :'其他人'}}已推荐过此人</div>
      </div>
      <button class="btn-submit" :class="{disabled:isSubmit}" @click="submit" :loading="isSubmit" :disabled="isSubmit">立即推荐</button>
    </div>
    <div class="tj-text">
      说明:
      <br>1、无忧家政工作人员在联系过程中不会透露是您推荐的，请放心。
      <br>2、每签约一位好友，送您200工资券，可以用来给家政服务员发工资使用，累积不上限，多多推荐吧。
    </div>
  </div>
</template>

<script>
import Auth from '@/utils/auth.js'

export default {
  data() {
    return {
      isSubmit: false,
      form: [{ value: '', error: false, isSelf: false }]
    }
  },
  components: {},
  methods: {
    opreat(index) {
      if (index === this.form.length - 1) {
        this.form.push({ value: '', error: false, isSelf: false })
      } else {
        this.form.splice(index, 1)
      }
    },
    inputFocusEvt(idx) {
      this.form[idx].error = false
      this.form[idx].isSelf = false
    },
    submit() {
      console.log(this.form)
      let arr = []
      for (let index = 0; index < this.form.length; index++) {
        const element = this.form[index]
        if (!this.$utils.checkMobile(element.value) && element.value != '') {
          this.$utils.showError('手机号格式不正确')
          return false
          break
        }
        if (element.value) {
          arr.push(element.value)
        }
      }

      if (arr.length === 0) {
        this.$utils.showError('至少添加一个手机号')
        return false
      }
      console.log(arr)

      // if (!this.$utils.checkMobile(this.mobile)) {
      //   this.$utils.showError('手机号格式不正确')
      //   return false
      // }
      this.isSubmit = true
      this.$http.post('UserTuijian', { tjsj: JSON.stringify(arr) }).then(
        res => {
          console.log(res)
          this.isSubmit = false
          if (res.ret === 0) {
            this.$utils.showError('推荐成功')
            this.form = [{ value: '' }]
          } else if (res.ret == -2) {
            let userId = Auth.getInfo('user_id')
            let errList = res.data
            this.form.forEach(item => {
              let r = errList.find(subItem => {
                return item.value === subItem.guphone
              })
              if (r) {
                item.error = true
                item.isSelf = r.userid == userId
              }
            })
            console.log(this.form)
            // console.log(userId)
            // this.$utils.showError(res.msg)
          } else if (res.msg) {
            this.$utils.showError(res.msg)
          } else {
            this.$utils.showError('系统异常，请稍后再试')
          }
        },
        err => {
          this.isSubmit = false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.wrap {
  min-height: 100vh;
  background: #fff;
  position: relative;
  padding-bottom: 270rpx;
  box-sizing: border-box;
}
.banner {
  .img {
    width: 100%;
    height: 276rpx;
  }
}
.form-group {
  padding: 40rpx 50px;
  .input-block {
    position: relative;
    display: flex;
    margin-bottom: 40rpx;
    &.err {
      .input {
        border-color: #fe2724;
      }
    }
    .error {
      position: absolute;
      bottom: -40rpx;
      color: #fe2724;
      font-size: 24rpx;
      line-height: 40rpx;
    }
    .input {
      flex: 1;
      height: 100rpx;
      padding-left: 20rpx;
      border: 1rpx solid #e0e0e0;
      border-radius: 10rpx;
      font-size: 30rpx;
      box-sizing: border-box;
      transition: 0.3s;
    }
    .btn {
      width: 130rpx;
      line-height: 100rpx;
      box-sizing: border-box;
      padding-right: 25rpx;
      text-align: right;
      font-size: 30rpx;
      color: $primary;
      &.del {
        color: #fe2724;
      }
    }
  }
  .btn-submit {
    height: 88rpx;
    line-height: 88rpx;
    color: #fff;
    font-size: 34rpx;
    background-color: $primary;
    border-radius: 10rpx;
  }
}
.tj-text {
  padding: 0 40rpx;
  height: 270rpx;
  position: absolute;
  bottom: 0;
  font-size: 30rpx;
  line-height: 1.5;
}
</style>

