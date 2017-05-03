<template>
<div class="t-shadow frame-box game-cast">
  <p>游戏费用：{{cast}}</p>
  <p>胜利将获得：{{rebate}}</p>
</div>
</template>
<script>
export default {
  name: 'SlotMachineCast',
  props: {
    cast: Number,
    rebate: Number
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
