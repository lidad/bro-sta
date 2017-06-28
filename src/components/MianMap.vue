<template>
<div class="map">
  <FootLink url="/status" :imgUrl="require('../assets/img/status_icon.jpg')" />
  <ActiveSign v-for="activity in allActivities" :activity="activity" :key="activity.id" @click.native="selectAction(activity.activityId)" />
  <ActivityModal/>
  <Popup/>
</div>
</template>

<script>
import FootLink from './common/FootLink';
import ActiveSign from './ActiveSign';
import ActivityModal from './ActivityModal';
import Popup from './common/Popup';

import {
  mapState
} from 'vuex';

export default {
  name: 'MianMap',
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState({
      money: state => state.BroStore.money,
      fixCarR: state => state.RuleStore.fixCarR,
      allActivities: state => state.ActivityStore.allActivities,
      chosenActivity: state => state.ActivityStore.chosenActivity,
      broStatus: state => state.BroStore.broStatus,
    })
  },
  created() {
    if (this.broStatus.dailyAccount)
      this.$store.commit('ShowModal', {
        show: true,
        title: '还有代还款～',
        tips: `今日应还${this.broStatus.dailyAccount}`
      })
  },
  methods: {
    selectAction(id) {
      this.$store.commit('ChooseActivity', id)
      this.showModal = true;
    },
  },
  components: {
    FootLink,
    ActiveSign,
    ActivityModal,
    Popup
  }
}
</script>

<style lang="scss">
.map {
    width: 100vw;
    height: 100vh;
    background: transparent url('../assets/img/map.jpg') left top no-repeat;
    background-size: 100% 100%;
}
</style>
