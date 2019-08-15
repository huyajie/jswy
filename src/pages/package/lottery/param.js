import Auth from '@/utils/auth'
const parms = {
  apiKey: '51baomu',
  version: '1.0',
  clientId: '111',
  reqId: '1',
  reqTime: '1561538290018',
  dataType: 'json',
  data: {
    chongzhika_huodong_id: '3041',
    shoujihao: Auth.getInfo('shoujihao'),
    guanggaozuid: '0',
    laiyuan: '家事无忧微信小程序'
  },
  sign: '1',
  token: 'login'
}
export { parms }
