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

const EARLY_TIME = 100;
const MIDDLE_TIME = 200;
const FINAL_TIME = 500;
const STAND_TIME = 15000;
const STAND_RUN_TIME = 50;

async function runMachine(commit) {
  const titleTime = Math.round(Math.random() * 1E4);
  const earlyStage = 0.6 * titleTime;
  const middleStage = 0.3 * titleTime;
  const finalStage = 0.1 * titleTime;

  let tempT = await flashCard(earlyStage, EARLY_TIME);
  clearTimeout(tempT);
  tempT = await flashCard(middleStage, MIDDLE_TIME);
  clearTimeout(tempT);
  tempT = await flashCard(finalStage, FINAL_TIME);
  clearTimeout(tempT);
  // commit('end');

  function flashCard(delayTime, runTime) {
    const newT = setInterval(() => void commit('setResult'), runTime);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newT), delayTime);
    })
  }
}

const state = {
  cards: MACHINE_CARDS,
  tempSelectedIndex: 0,
  resultIndex: 0,
  playing: false,
  odds: 1,
  originalCast: 2000
}

const mutations = {
  selectCard(state, dir) {
    let index = state.tempSelectedIndex + dir;
    if (index < 0)
      index = state.cards.length - 1;
    if (index >= state.cards.length)
      index = 0;
    state.tempSelectedIndex = index;
  },
  setResult(state) {
    let index = state.resultIndex + 1;
    if (index >= state.cards.length)
      index = 0;
    state.resultIndex = index
  },
  begin(state, index) {
    state.playing = true;
  },
  end(state, index) {
    state.playing = false;
  },
  adjustOdds(state, plus) {
    const tempOdds = state.odds + plus * 0.5;
    if (~~ tempOdds)
      state.odds = tempOdds;
    }
  }

let MachineT;

const actions = {
  beginPlaying({commit}) {
    commit('begin');
    new Promise((resolve, reject) => {
      MachineT = setInterval(() => void commit('setResult'), STAND_RUN_TIME);
      setTimeout(() => resolve(MachineT), STAND_TIME);
    }).then((t) => {
      if (!t)
        return;
      clearTimeout(t);
      MachineT = undefined;
      runMachine(commit);
    })
  },
  end({commit}) {
    if (!MachineT)
      return;
    clearTimeout(MachineT);
    MachineT = undefined;
    runMachine(commit);

  }
}

export default {
  state,
  mutations,
  actions
}
