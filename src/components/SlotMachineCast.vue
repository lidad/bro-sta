<template>
<div class="t-shadow frame-box game-cast">
  <p>游戏费用：2000</p>
  <p>胜利将获得：4000</p>
</div>
</template>
<script>
export default {
  name: 'SlotMachineCast'
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
