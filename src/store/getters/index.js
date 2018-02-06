export const count = (state) => {
    return state.count;
};

export const pageData = (state) => {
    return state.pageData;
};

export const buyData = (state) => {
    return state.buyData;
};

export const saleData = (state) => {
    return state.saleData;
};

export const windowHeight = (state) => {
    return state.root.windowHeight;
};

export const contentHeight = (state) => {
    return state.root.windowHeight - 150;
};

export const userInfo = (state) => {
    return state.userInfo;
};

export const userId = (state) => {
    return state.userInfo.userId;
};
export const userName = (state) => {
    return state.userInfo.nickName;
};
export const userMobile = (state) => {
    return state.userInfo.mobile;
};
export const userEmail = (state) => {
    return state.userInfo.email;
};

export const orderData = (state) => {
    return state.orderData;
};

export const adData = (state) => {
    return state.adData;
};