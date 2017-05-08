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
  Show(state, data) {
    Object.assign(state, originState, data);
  },
  Hide(state) {
    state.show = false;
    state.title = '';
    state.tips = '';
  }
}

export default {
  state,
  mutations
}
