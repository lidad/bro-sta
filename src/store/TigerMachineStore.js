import Vue from 'vue';

const MACHINE_CARDS = [
  require('../assets/img/tiger_0.jpg'),
  require('../assets/img/tiger_1.png'),
  require('../assets/img/tiger_2.png'),
  require('../assets/img/tiger_3.jpg'),
  require('../assets/img/tiger_4.png'),
  require('../assets/img/tiger_5.png'),
  require('../assets/img/tiger_6.jpg'),
  require('../assets/img/tiger_7.jpg')
]

const state = {
  cards: MACHINE_CARDS,
  tempSelectedIndex: 0,
  resultIndex: 0,
  playing: false
}

const mutations = {
  selectCard(state, index) {
    state.tempSelectedIndex = index
  },
  setResult(state, index) {
    state.resultIndex = index
  },
  begin(state, index) {
    state.playing = true;
  },
  end(state, index) {
    state.playing = false;
  }
}

const actions = {
  beginPlaying({commit}) {
    commit('begin');
  }
}

export default {
  state,
  mutations,
  actions
}
