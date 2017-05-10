import Vue from 'vue';

const originState = {
  show: false,
  title: '',
  tips: '',
  cb: () => {}
}

const state = {
  ...originState
}

const mutations = {
  ShowModal(state, data) {
    Object.assign(state, originState, data);
  },
  HideModal(state) {
    state.show = false;
    state.title = '';
    state.tips = '';
  }
}

export default {
  state,
  mutations
}
