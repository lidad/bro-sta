<template>
<div v-if="playing" class="tiger-block frame-box playing">
  <div class="items"><img v-for="(card, index) in upPlayingCards" class="tiger-item" :class="(index === resultIndex) ? 'b-block' : ''" :src="card" /></div>
  <div class="items"><img v-for="(card, index) in downPlayingCards" class="tiger-item" :class="(index + 4  === resultIndex) ? 'b-block' : ''" :src="card" /></div>
  <div class="end-action">
    <img class="result" :src="resultCard" />
    <button v-if="endGame" @click="play" class="end t-shadow b-block">再来</button>
    <button v-else @click="end" class="end t-shadow b-block">停</button>
  </div>
</div>
<div v-else class="tiger-block show frame-box">
  <img v-for="(card, index) in cards" class="tiger-item" :class="(index === selected) ? 'b-block' : ''" :src="card" />
</div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';
export default {
  name: 'SlotMachineResult',
  beforeUpdate() {
    if (!this.endShow && this.playing && this.endGame) {
      let popUpInfo = {};
      if (this.selected === this.resultIndex) {
        popUpInfo = {
          show: true,
          title: '红了！老哥稳',
          tips: this.rebate + '进账'
        }
        this.$store.commit('UpdateBro', {
          money: this.broStatus.money + this.rebate,
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
      resultCard(state) {
        const {
          cards,
          resultIndex
        } = state.SlotMachineStore;
        return cards[resultIndex];
      },
      rebate(state) {
        const {
          odds,
          originalCast
        } = state.SlotMachineStore;
        return originalCast * odds * 2;
      }
    })
  },
  methods: {
    ...mapMutations(['playAgain']),
    ...mapActions(['end']),
    play() {
      this.endShow = false;
      this.playAgain()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/rem.scss";
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
</style>
