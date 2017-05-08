<template>
<div class="t-shadow frame-box game-cast">
  <p>花费：{{cast}}</p>
  <p>胜利将获得：{{cast *2}}</p>
</div>
</template>
<script>
import {
  mapState
} from 'vuex';
export default {
  name: 'SlotMachineCast',
  computed: {
    ...mapState({
      cast(state) {
        const {
          odds,
          originalCast
        } = state.SlotMachineStore;
        return originalCast * odds;
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/rem.scss";
.game-cast {
    position: fixed;
    top: 4vh;
    right: 3vw;
    padding: 1vw;
    color: #FFFFFF;
    p {
        font-size: px2rem(15);
    }
}
</style>
