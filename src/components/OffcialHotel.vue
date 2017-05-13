<template>
<div class="offcial-hotel">
  <ConerStatus/>
  <MapFootLink/>
</div>
</template>
<script>
import ConerStatus from './common/ConerStatus';
import MapFootLink from './MapFootLink';

export default {
  name: 'OffcialHotel',
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
