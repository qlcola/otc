export const increaseCount = ({ commit }) => {
    commit('INCREASE_COUNT');
};

export const decreaseCount = ({ commit }) => {
    commit('DECREASE_COUNT');
};

export const resize = ({ commit }, payload) => {
    commit('RESIZE', payload);
};

export const logout = ({ commit }) => {
    commit('LOGOUT');
};