//store/modules/fiche.js

import axios from "axios";

const state = {
    pending: null,
    fiche: null,
    task: null,
    doc_list: []
};


const actions = {

  async fetchPending({commit}, token) {
    const headers = {
        authorization: "Bearer " +  token,
    };
    let pending = await axios.get("action", {
      headers
    });
    this.pending = pending.data
    await commit("SET_PENDING", this.pending)
  },

  async fetchFiche({commit}, token) {
    const headers = {
        authorization: "Bearer " +  token,
    };
    let fiche = await axios.get("fiche", {
      headers
    });
    this.fiche = fiche.data
    await commit("SET_FICHE", this.fiche)
  },


  async fetchTask({commit}, token) {
    const headers = {
        authorization: "Bearer " +  token,
    };
    let task = await axios.get("task", {
      headers
    });
    this.task = task.data
    await commit("SET_TASK", this.task)
  },

};

const mutations = {

  SET_PENDING(state, pending) {
    state.pending = pending
  },
  SET_FICHE(state, fiche) {
    state.fiche = fiche
  },
  SET_TASK(state, task) {
    state.task = task
  }
};


export default {
  state,
  actions,
  mutations,
};