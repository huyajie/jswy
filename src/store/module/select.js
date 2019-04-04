import request from '../../utils/request'

const select = {
  state: {
    city: [],
    serviceType: [
      {
        ID: 1,
        DISPLAY: '住家保姆',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'zhujiabaomu'
      },
      {
        ID: 2,
        DISPLAY: '不住家保姆',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'buzhujiabaomu'
      },
      {
        ID: 3,
        DISPLAY: '月嫂',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'yuesao'
      },
      {
        ID: 4,
        DISPLAY: '育儿嫂',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'yuersao'
      },
      {
        ID: 5,
        DISPLAY: '小时工',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'xiaoshigong'
      },
      {
        ID: 6,
        DISPLAY: '护工',
        LOV: '服务员类型',
        PARENT_LOV: null,
        PARENT_RETURNED: null,
        RETURNED: 'hugong'
      }
    ]
  },
  mutations: {
    CHANGE_CITY(state, city) {
      state.city = city
    }
  },
  actions: {
    GET_CITY({ state, commit }) {
      if (state.city.length > 0) {
        return false
      }
      request.get('regions').then(res => {
        if (res.ret === 0) {
          commit('CHANGE_CITY', res.data)
        }
        console.log(res)
      })
    }
  }
}
export default select
