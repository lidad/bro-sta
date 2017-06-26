import Vue from 'vue';

const BRO_STATUS = {
  name: '聚宝',
  money: 12500,
  hp: {
    total: 120,
    current: 40
  },
  hungry: {
    total: 80,
    current: 60
  },
  ap: 100,
  sp: 100,
  debt: 2000,
  dailyAccount: 34
}

const state = {
  broStatus: BRO_STATUS
}

const mutations = {
  UpdateBro(state, data) {
    state.broStatus = Object.assign({}, state.broStatus, data);
  }
}

export default {
  state,
  mutations
}
