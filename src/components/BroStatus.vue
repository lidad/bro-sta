<template>
<div class="status">
  <div class="bg"></div>
  <p class="title t-shadow">{{broStatus.name}}老哥</p>
  <div class="info">
    <SProgress title="体力" :count="broStatus.hp.total" :current="broStatus.hp.current" />
    <SProgress title="饱食" :count="broStatus.hungry.total" :current="broStatus.hungry.current" />
    <p>攻击力<span class="fr">{{broStatus.ap}}</span></p>
    <p>敏捷<span class="fr">{{broStatus.sp}}</span></p>
    <p>钱<span class="fr">{{broStatus.money}}</span></p>
    <br/>
    <p>账单<span class="fr">{{broStatus.debt}}</span></p>
    <p>今日应还<span class="fr">{{broStatus.dailyAccount}}</span></p>
  </div>
  <a href="javascript:void(0);" class="pay frame-box">还款</a>
  <div v-if="isShowPay" class="pay-debt">
    <button>还今日款</button>
    <button>还所有欠款</button>
  </div>
  <MapFootLink/>
</div>
</template>

<script>
import SProgress from './common/SProgress'
import MapFootLink from './MapFootLink'

import {
  mapState
} from 'vuex';

export default {
  name: 'BroStatus',
  data() {
    return {
      isShowPay: false
    }
  },
  computed: {
    ...mapState({
      broStatus: state => state.BroStore.broStatus,
    })
  },
  components: {
    SProgress,
    MapFootLink
  }
}
</script>

<style lang="scss">
@import "../assets/scss/rem.scss";
.status {
    height: 100vh;
    width: 100vw;
    background-color: rgba(51, 51, 51,0.5);
    position: relative;
    .title {
        margin-left: 13%;
        padding-top: 10vh;
        color: #FFFFFF;
        font-size: px2rem(20);
    }
    .bg {
        background: transparent url('../assets/img/bro_back.jpg') left top no-repeat;
        background-size: 100% 100%;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;
    }
    .info {
        background-color: rgba(51, 51, 51,0.5);
        width: 80%;
        padding: 5px 5%;
        margin-top: px2rem(10);
        margin-left: 5%;
        > * {
            margin-bottom: px2rem(5);
            font-size: px2rem(10);
            color: #e9e9e9;
        }
    }
    .pay {
        color: rgba(255, 255, 255,0.7);
        position: fixed;
        left: 5%;
        bottom: 3%;
        padding: px2rem(4) px2rem(8);
    }
}
</style>
