const state = {
    doc_list: []
};

const actions = {
    async addFormality({commit}, formalities) {
        await commit('ADD_TO_FORMALITY', formalities)
    }

};

const mutations = {
    ADD_TO_FORMALITY(state, formalities) {
        state.doc_list = []
        state.doc_list.push(formalities)
    }
};

export default {
    state,
    actions,
    mutations,
};