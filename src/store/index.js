import Vue from 'vue';
import Vuex from 'vuex';

import BroStore from './BroStore';
import RuleStore from './RuleStore';
import ActivityStore from './ActivityStore';
import ClubStore from './ClubStore';
import PopUpStore from './PopUpStore';
import TigerMachineStore from './TigerMachineStore';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    RuleStore,
    BroStore,
    ActivityStore,
    ClubStore,
    PopUpStore,
    TigerMachineStore
  }
})

export default store;
