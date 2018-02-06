export const FETCH_SUCCESS = (state, data) => {
    state.pageData = data;
};

export const FETCH_FAIL = (state, data) => {
    state.pageData = data;
};

export const GETBASEDATA = (state, data) => {
    state.baseData = data;
};

export const GETBUYDATA = (state, data) => {
    state.buyData = data;
};

export const GETSALEDATA = (state, data) => {
    state.saleData = data;
};

export const GET_USER_INFO = (state, payload) => {
    state.userInfo = payload;
};

export const GET_ORDER_DATA = (state, payload) => {
    state.orderData[`st-${payload.status}`] = payload.data;
};

export const GET_AD_DATA = (state, data) => {
    state.adData = data;
};

export const GET_FINANCIAL_DATA = (state, payload) => {
    state.financialData = payload;
};