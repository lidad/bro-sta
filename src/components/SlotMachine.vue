<template>
<div class="pass-three">
  <ConerStatus/>
  <SlotMachineCast/>
  <SlotMachineResult/>
  <SlotMachineSelect/>
  <MapFootLink/>
  <Popup/>
</div>
</template>

<script>
import MapFootLink from './MapFootLink';
import ConerStatus from './common/ConerStatus';
import SlotMachineCast from './SlotMachineCast';
import SlotMachineResult from './SlotMachineResult';
import SlotMachineSelect from './SlotMachineSelect';
import Popup from './common/Popup';

export default {
  name: 'SlotMachine',
  components: {
    MapFootLink,
    ConerStatus,
    SlotMachineCast,
    SlotMachineResult,
    SlotMachineSelect,
    Popup
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
}
</style>
