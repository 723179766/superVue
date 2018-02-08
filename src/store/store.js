/**
 * Created by qiduyu on 2018/2/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    name1: '张山',
    name2: '李式',
    name3: '王武',
    arr1: [1,2,3,4,5]
  },
  mutations: {
    increment (state, data) {
      state.count+=data
    },
    decrement (state, data) {
      state.count-=data
    }
  },
  getters: {
    filterArr: state => {
      return state.arr1.filter(todo => todo===5 || todo===3)
    },
    filterArrCount: (state, getters) => {
      return getters.filterArr.length
    }
  }
})
export default store
