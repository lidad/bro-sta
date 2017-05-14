<template>
<div class="offcial-hotel">
  <ConerStatus/>
  <section class="dishes frame-box t-shadow">
    <h2 class="title">{{selectdedDish.name}}</h2>
    <p class="info">{{selectdedDish.info}}</p>
    <p class="fee">¥{{selectdedDish.fee}}</p>
    <p class="effect">增加饱食度{{selectdedDish.effect}}</p>
    <button class="left b-block t-shadow" @click="selectDish(-1)"><img src="../assets/img/left.png"></button>
    <button class="right b-block t-shadow" @click="selectDish(1)"><img src="../assets/img/right.png"></button>
    <div class="action">
      <button class="btn b-block">吃</button>
      <button class="btn b-block">闪</button>
    </div>
  </section>
  <MapFootLink/>
</div>
</template>
<script>
import {
  mapState,
  mapMutations
} from 'vuex';

import ConerStatus from './common/ConerStatus';
import MapFootLink from './MapFootLink';

export default {
  name: 'OffcialHotel',
  computed: {
    ...mapState({
      selectdedDish(state) {
        const {
          dishes,
          selectdedDishIndedx
        } = state.HotelStore;
        return dishes[selectdedDishIndedx];
      }
    }),
  },
  methods: {
    ...mapMutations(['selectDish']),
  },
  components: {
    ConerStatus,
    MapFootLink
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/rem.scss";
.offcial-hotel {
    width: 100vw;
    height: 100vh;
    background: url('../assets/img/hotel_bg.png') left top no-repeat;
    background-size: 100% 100%;
    .dishes {
        width: 80vw;
        position: fixed;
        left: 10vw;
        top: 30vh;
        text-align: center;
        color: #FFFFFF;
        padding: px2rem(10) 0;
        p {
            margin-top: px2rem(12);
        }
        .title {
            color: #FFFFFF;
            font-size: px2rem(18);
        }
        .effect,
        .info {
            font-size: px2rem(14);
            padding: 0 px2rem(20);
        }
        .fee {
            font-size: px2rem(18);
            margin-bottom: px2rem(-4);
        }
        .left,
        .right {
            padding: 0;
            position: absolute;
            bottom: px2rem(70);
            img {
                width: px2rem(30);
                vertical-align: middle;
            }
        }

        .left {
            left: px2rem(20);
        }
        .right {
            right: px2rem(20);
        }
        .action {
            margin-top: px2rem(15);
            .btn:first-child {
                margin-right: px2rem(60);
            }
        }
    }
}
</style>
