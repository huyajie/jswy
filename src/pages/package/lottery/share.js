import request from '@/utils/request'
import { parms } from './param'
export default function() {
  console.log(parms)
  request.post('https://api.51baomu.cn/v1/Huodong/Zhuanpanchoujiangfenxiang', parms).then(res => {
    console.log(res)
  })
  return {
    path: `/pages/package/lottery/main`
  }
}
