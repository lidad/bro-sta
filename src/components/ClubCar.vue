<template>
<div class="fixCar t-shadow">
  <ConerStatus/>
  <transition name="fade" mode="out-in">
    <img class="car-p" :src="currentCarDetails.img" />
  </transition>
  <section class="info frame-box">
    <h1 class="name">{{currentCarDetails.name}}</h1>
    <p class="intro">{{currentCarDetails.intro}}</p>
    <P class="effect">生命最大值+{{currentCarDetails.effect.hp}}，饱食度{{currentCarDetails.effect.hungry}}</p>
    <div class="cut-car">
      <button @click="cutCar(-1)" class="left b-block"><img src="../assets/img/left.png"></button>
      <p class="fee">¥ {{currentCarDetails.fee}}</p>
      <button @click="cutCar(1)" class="right b-block"><img src="../assets/img/right.png"></button>
    </div>
    <div class="actions">
      <button @click="fixIt" class="left b-block t-shadow">修</button>
      <button @click="cancel" class="right b-block  t-shadow">算了</button>
    </div>
  </section>
  <MapFootLink/>
  <Popup/>
</div>
</template>


<script>
import {
  mapState
} from 'vuex';

import MapFootLink from './MapFootLink';
import ConerStatus from './common/ConerStatus';
import Popup from './common/Popup';

export default {
  name: 'ClubCar',
  data() {
    return {
      currentCar: 0
    }
  },
  computed: {
    ...mapState({
      cars: state => state.ClubStore.cars,
      broStatus: state => state.BroStore.broStatus,
    }),
    currentCarDetails() {
      return this.cars[this.currentCar]
    },
    totalCar() {
      return this.cars.length - 1
    }
  },
  methods: {
    cutCar(dir) {
      const currentCar = this.currentCar + dir
      this.currentCar = currentCar < 0 ? this.totalCar : currentCar > this.totalCar ? 0 : currentCar
    },
    cancel() {
      this.$router.back()
    },
    fixIt() {
      const {
        money,
        hp,
        hungry
      } = this.broStatus;
      const {
        fee,
        effect
      } = this.currentCarDetails;
      const leaveMoney = money - fee;
      const leavehungry = hungry.current + effect.hungry;
      if (leaveMoney < 0) {
        this.$store.commit('ShowModal', {
          show: true,
          title: `老哥，还差${~leaveMoney + 1}，总不能修霸王车吧～`,
          tips: '老哥可以进场打工，过三关搞点路子'
        })
      } else if (leavehungry < 0) {
        this.$store.commit('ShowModal', {
          show: true,
          title: '修不动了，饿！',
          tips: '给鸡儿放个假吧～'
        })
      } else {
        const newBroSta = {
          money: leaveMoney,
          hp: Object.assign({}, hp, {
            total: hp.total + effect.hp
          }),
          hungry: Object.assign({}, hungry, {
            current: hungry.current + effect.hungry
          })
        }
        this.$store.commit('UpdateBro', newBroSta);
        this.$nextTick(() => {
          this.$store.commit('ShowModal', {
            show: true,
            title: '鸡儿梆硬！',
            tips: `修了一发，hp增加${effect.hp}，饱食度减少${effect.hungry}。具体信息可以参照左上角～`
          })
        });
      }
    }
  },
  components: {
    MapFootLink,
    ConerStatus,
    Popup
  }
}
</script>

<style lang="scss">
@import "../assets/scss/rem.scss";
.fixCar {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: rgba(51, 51, 51,0.6);
    .info {
        color: rgba(255, 255, 255,0.9);
        text-align: center;
        padding: 1vh 0;
        position: fixed;
        top: 40vh;
        left: 15vw;
        width: 70vw;
    }
    .car-p {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .name {
        color: #FFFFFF;
    }
    .effect,
    .fee,
    .intro {
        margin: px2rem(15) 0;
        font-size: px2rem(16);
        padding: 0 4%;
    }
    .fee {
        font-size: px2rem(24);
        color: rgba(255, 255, 255,0.9);
    }
    .left,
    .right {
        padding: 0;
        img {
            width: px2rem(30);
            vertical-align: middle;
        }
    }
    .cut-car {
        margin: 0 auto;
        width: 60vw;
        > * {
            display: inline-block;
        }
        .fee {
            width: 52%;
        }
    }
    .actions {
        margin: px2rem(23) auto;
        width: 50vw;
        .left,
        .right {
            font-size: px2rem(22);
            width: px2rem(60);
        }
        .left {
            margin-right: px2rem(10);
        }
    }
}
</style>
