//store/modules/auth.js

import axios from "axios";
const state = {
  user: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};
const actions = {
  async Register({ dispatch }, form) {
    await axios.post("user/signup", form);
    await dispatch("LogIn", form);
  },

  async LogIn({ commit }, User) {
    const response = await axios.post("user/login", User);
    console.log(response)
    await commit("setUser", response.data);
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
