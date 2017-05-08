<template>
<div class="pass-three">
  <ConerStatus/>
  <SlotMachineCast :cast="cast" :rebate="cast * 2" />
  <SlotMachineResult/>
  <div class="select-tiger frame-box" :class="{playing}">
    <button class="left btn" @click="selectCard(-1)"><img src="../assets/img/left.png"></button>
    <button class="right btn" @click="selectCard(1)"><img src="../assets/img/right.png"></button>
    <div class="choose-block">
      <img class="expect" :src="selectedCard" />
      <div class="bet t-shadow">
        <button @click="adjustOdds(1)" class="up btn"><img src="../assets/img/fold.png"></button>
        <p class="num">{{odds.toFixed(1)}}</p>
        <p class="tips">加倍</p>
        <button @click="adjustOdds(-1)" class="down btn"><img src="../assets/img/unfold.png"></button>
      </div>
    </div>
    <div class="actions">
      <button class="left b-block t-shadow" @click="play">上</button>
      <button class="b-block t-shadow" @click="back">撤</button>
    </div>
  </div>
  <MapFootLink/>
  <Popup/>
</div>
</template>

<script>
import MapFootLink from './MapFootLink';
import ConerStatus from './common/ConerStatus';
import SlotMachineCast from './SlotMachineCast';
import SlotMachineResult from './SlotMachineResult';
import Popup from './common/Popup';
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  name: 'SlotMachine',
  computed: {
    ...mapState({
      odds: state => state.SlotMachineStore.odds,
      playing: state => state.SlotMachineStore.playing,
      broStatus: state => state.BroStore.broStatus,
      selectedCard(state) {
        const {
          cards,
          tempSelectedIndex
        } = state.SlotMachineStore;
        return cards[tempSelectedIndex];
      },
      cast(state) {
        const {
          odds,
          originalCast
        } = state.SlotMachineStore;
        return originalCast * odds;
      }
    })
  },
  components: {
    MapFootLink,
    ConerStatus,
    SlotMachineCast,
    SlotMachineResult,
    Popup
  },
  methods: {
    ...mapMutations(['selectCard', 'adjustOdds']),
    ...mapActions(['beginPlaying']),
    back() {
      this.$router.back()
    },
    play() {
      this.endShow = false;
      let popUpInfo = {};
      if (this.broStatus.money < this.cast) {
        popUpInfo = {
          show: true,
          title: '老哥，身上的钱不够耍呀'
        }
      } else {
        const newBroSta = {
          money: this.broStatus.money - this.cast,
        }
        popUpInfo = {
          show: true,
          title: '老哥将花费' + this.cast + '玩一发',
          tips: '赢了加倍，输了一分钱都没有哦~',
          cb: () => {
            this.beginPlaying();
            this.$store.commit('UpdateBro', newBroSta);
          }
        }
      }
      this.$store.commit('Show', popUpInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/rem.scss";
.pass-three {
    width: 100vw;
    height: 100vh;
    background: url('../assets/img/pass_bg.png') left top no-repeat;
    background-size: 100% 100%;
    .select-tiger {
        position: fixed;
        left: px2rem(38);
        top: 50vh;
        &.playing {
            top: 70vh;
            left: px2rem(52);
            .actions,
            .btn {
                display: none;
            }
            .choose-block {
                padding: 0;
                .expect {
                    margin-left: 0;
                }
                .bet {
                    .num {
                        margin-top: px2rem(20);
                    }
                }
            }
        }
        .btn {
            background-color: rgba(255, 255, 255, 0);
            padding: 0;
            &.left {
                position: absolute;
                top: px2rem(50);
                left: px2rem(-10);
            }
            &.right {
                position: absolute;
                top: px2rem(50);
                right: px2rem(-10);
            }
            img {
                width: px2rem(40);
            }
        }
        .choose-block {
            padding: 0 px2rem(20);
            width: px2rem(260);
            height: px2rem(140);
            > * {
                vertical-align: middle;
                display: inline-block;
            }
            .expect {
                margin-left: px2rem(10);
                padding: px2rem(10);
                height: px2rem(120);
                width: px2rem(120);
            }
            .bet {
                position: relative;
                height: px2rem(140);
                width: px2rem(100);
                text-align: center;
                color: #FFFFFF;
                .num {
                    font-size: px2rem(40);
                }
                .tips {
                    font-size: px2rem(16);
                    margin-top: px2rem(6);
                }
                .up {
                    margin-top: px2rem(-10);
                }
                .down {
                    margin-bottom: px2rem(-10);
                }
            }
        }
        .actions {
            margin: px2rem(15) 0;
            text-align: center;
            .left {
                margin-right: px2rem(40);
            }
            .b-block {
                font-size: px2rem(20);
            }
        }
    }
}
</style>
