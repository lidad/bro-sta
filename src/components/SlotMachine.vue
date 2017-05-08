<template>
<div class="pass-three">
  <ConerStatus/>
  <SlotMachineCast :cast="cast" :rebate="cast * 2" />
  <div v-if="playing" class="tiger-block frame-box playing">
    <div class="items"><img v-for="(card, index) in upPlayingCards" class="tiger-item" :class="(index === resultIndex) ? 'b-block' : ''" :src="card" /></div>
    <div class="items"><img v-for="(card, index) in downPlayingCards" class="tiger-item" :class="(index + 4  === resultIndex) ? 'b-block' : ''" :src="card" /></div>
    <div class="end-action">
      <img class="result" :src="resultCard" />
      <button v-if="endGame" @click="playAgain" class="end t-shadow b-block">再来</button>
      <button v-else @click="end" class="end t-shadow b-block">停</button>
    </div>
  </div>
  <div v-else class="tiger-block show frame-box">
    <img v-for="(card, index) in cards" class="tiger-item" :class="(index === selected) ? 'b-block' : ''" :src="card" />
  </div>
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
import Popup from './common/Popup';
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  name: 'SlotMachine',
  beforeUpdate() {
    if (!this.endShow && this.playing && this.endGame) {
      let popUpInfo = {};
      if (this.selected === this.resultIndex) {
        const rebate = this.cast * 2;
        popUpInfo = {
          show: true,
          title: '红了！老哥稳',
          tips: rebate + '进账'
        }
        this.$store.commit('UpdateBro', {
          money: this.broStatus.money + rebate,
        })
      } else {
        popUpInfo = {
          show: true,
          title: '没赢，老哥不太稳呀',
          tips: '仍需再接再厉'
        }
      }
      this.endShow = true;
      this.$store.commit('Show', popUpInfo);
    }
  },
  data() {
    return {
      endShow: false
    }
  },
  computed: {
    ...mapState({
      odds: state => state.SlotMachineStore.odds,
      playing: state => state.SlotMachineStore.playing,
      endGame: state => state.SlotMachineStore.ending,
      cards: state => state.SlotMachineStore.cards,
      resultIndex: state => state.SlotMachineStore.resultIndex,
      selected: state => state.SlotMachineStore.tempSelectedIndex,
      broStatus: state => state.BroStore.broStatus,
      upPlayingCards(state) {
        const {
          cards
        } = state.SlotMachineStore;
        return cards.slice(0, cards.length / 2);
      },
      downPlayingCards(state) {
        const {
          cards
        } = state.SlotMachineStore;
        return cards.slice(cards.length / 2, cards.length);
      },
      selectedCard(state) {
        const {
          cards,
          tempSelectedIndex
        } = state.SlotMachineStore;
        return cards[tempSelectedIndex];
      },
      resultCard(state) {
        const {
          cards,
          resultIndex
        } = state.SlotMachineStore;
        return cards[resultIndex];
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
    Popup
  },
  methods: {
    ...mapMutations(['selectCard', 'adjustOdds', 'playAgain']),
    ...mapActions(['end', 'beginPlaying']),
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
    .tiger-block {
        position: fixed;
        top: 25vh;
        width: px2rem(180);
        height: px2rem(120);
        left: px2rem(88);
        padding: 0 px2rem(10);
        &.show {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-content: space-around;
        }
        &.playing {
            width: px2rem(260);
            left: px2rem(48);
            height: px2rem(260);
            text-align: center;
            .end-action {
                margin-top: px2rem(20);
                line-height: px2rem(120);
                .result {
                    width: px2rem(120);
                    height: px2rem(120);
                }
                .end {
                    margin-left: px2rem(34);
                    vertical-align: middle;
                    font-size: px2rem(25);
                }
            }
        }
        .items {
            margin-top: px2rem(10);
            display: flex;
            justify-content: space-around;
        }
        .tiger-item {
            width: px2rem(40);
            height: px2rem(40);
            &.b-block {
                width: px2rem(38);
                height: px2rem(38);
            }
        }
    }
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
