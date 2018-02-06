import axios from '@/axios';
import _ from 'lodash';

export const getTradeData = ({ commit }, payload) => {
    axios({
        url: '/otc/otcad/getOtcAds',
        method: 'post',
        data: payload,
    }).then((response) => {
        if (response.data.status === 1) {
            if (payload.adType === 1) {
                commit("GETSALEDATA", response.data.data.data);
            } else if (payload.adType === 2) {
                commit("GETBUYDATA", response.data.data.data);
            }
        }
    });
};

export const getSaleData = ({ commit }) => {
    axios.get("/api/sale", { withCredentials: true }).then(data => {
        var res = data.data;
        commit("GETSALEDATA", res);
    });
};

export const getUserInfo = ({ commit }) => {
    axios.get("/otc/user/userInfo", { withCredentials: true }).then(res => {
        if (res.data.status === 1) {
            commit("GET_USER_INFO", res.data.data);
        }
    });
};
export const getMyFinancial = ({ commit }) => {
    axios.get("/otc/user/myFinancial", { withCredentials: true }).then(res => {
        if (res.data.status === 1) {
            commit("GET_FINANCIAL_DATA",res.data.data);
        }
    });
};

export const getOrderData = ({ commit }, payload) => {
    axios({
        url: '/otc/otcorder/myOrders',
        method: 'post',
        data: payload,
    }).then(res => {
        commit("GET_ORDER_DATA", {
            data: res.data.data.data,
            status: payload.status
        });
    });
};
export const getAdData = ({ commit }, payload) => {
    axios({
      url: '/otc/otcad/myAd',
      method: 'post',
      data: payload,
    }).then(res => {
      commit("GET_AD_DATA", res.data.data.data);
    });
};
