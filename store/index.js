import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import addresses from '@/api/addresses';

// Vuex是一个插件，需要引入并用Vue.use()使用
Vue.use(Vuex);
// 实例化一个store并导出
const store = new Vuex.Store({
  state: {
    store: {},
    cart: [],
    orderType: 'takein',
    address: {},
    addresses: addresses,
    member: {},
    order: {},
  },
  // 和pinia一样，相当于是计算属性computed
  getters: {
    isLogin: (state) => Object.keys(state.member).length > 0, //是否登录
  },
  //mutations和actions都是处理事件的方法，只是前者不支持异步处理函数。pinia中没有mutations
  mutations: {
    SET_ORDER_TYPE(state, type) {
      state.orderType = type;
    },
    SET_MEMBER(state, member) {
      state.member = member;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses;
    },
    SET_STORE(state, store) {
      state.store = store;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    REMOVE_CART(state) {
      state.cart = [];
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
  },
  actions: {
    async getStore({ commit }) {
      const store = await api('store');
      commit('SET_STORE', store);
    },
  },
});

export default store;
