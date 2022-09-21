import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import fiche from './modules/fiche';
import formalities from './modules/formalities'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    fiche,
    formalities
  },
  plugins: [createPersistedState()],
});
