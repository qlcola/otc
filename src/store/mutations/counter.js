export const INCREASE_COUNT = (state) => {
    state.count++;
};

export const DECREASE_COUNT = (state) => {
    state.count--;
};

export const RESIZE = (state, payload) => {
    state.root.windowHeight = payload;
};

export const LOGOUT = (state, payload) => {
    state.userInfo = {};
};