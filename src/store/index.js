import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
    count: 0,
    pageData: {},
    buyData: [],
    saleData: [],
    root: {
        windowHeight: undefined,
    },
    userInfo: { //保存用户信息
      nick: null,
      uid: null,
    },
    orderData: {},
    adData: [],
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
});