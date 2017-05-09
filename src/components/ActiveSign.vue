<template>
<div class="card-game" :style="activity.position">
  <img :src="activity.imgUrl">
</div>
</template>

<script>
export default {
  props: ['activity']
}
</script>

<style lang="scss">
.card-game {
    position: fixed;
    width: 10vw;
    box-shadow: 1px -1px 2px #35939f, -1px 2px 4px #35939f, -1px -1px 2px #35939f, 1px 1px 2px #35939f;
    img {
        width: 100%;
    }
}
</style>
