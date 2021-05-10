<template>
  <router-view/>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onBeforeUnmount
}                  from "vue";
import {designOne} from "./design/fun/indexOne";

export default defineComponent({
  name: "Sakura",
  setup(){
    const {getArea}=designOne();
    const every=()=>getArea();

    onMounted(()=>{
      every();
      window.addEventListener('resize',every);
    });
    onBeforeUnmount(()=>{
      window.removeEventListener('resize',every);
    });
  }
})
</script>

<style lang="scss">

</style>