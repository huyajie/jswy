var fileHost = 'https://wuyouhdd.oss-cn-beijing.aliyuncs.com/' //你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
  AccessKeySecret: 'JXYrcGUtSWkmDmJXb6Jj1QSRRVSzUK', // AccessKeySecret 去你的阿里云上控制台上找
  OSSAccessKeyId: 'VZixIXKkiv9jGm68', // AccessKeyId 去你的阿里云上控制台上找
  timeout: 87600 //这个是上传文件时Policy的失效时间
}
module.exports = config
// https://wuyouhdd.oss-cn-beijing.aliyuncs.com/alioss/jzimg/type1/用户id
