<template>
<div class="offcial-hotel">
  <ConerStatus/>
  <section class="dishes">
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
}
</style>
