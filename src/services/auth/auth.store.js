import authService from './auth.service';

const state = {
    user: null,
    token: null,
    error: null,
    loading: false,
};

const getters = {
    user: state => state.user,
    token: state => state.token,
    error: state => state.error,
    loading: state => state.loading,
};

const actions = {
    async A_POST_LOGIN({ commit }, credentials) {
        commit('setLoading', true);
        const { data, status } = await authService.login(credentials);
        if (status === 200) {
            commit('setUser', data.user);
            commit('setToken', data.token);
            commit('setError', null);
        } else {
            commit('setError', data.message);
        }
        commit('setLoading', false);
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    setError(state, error) {
        state.error = error;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

