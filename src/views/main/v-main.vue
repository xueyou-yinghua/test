<template>
  <div class="v-main">
    <div class="one">
      <carousel/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive} from "vue";
import Carousel from "../../components/carousel/carousel.vue";

export default defineComponent({
  name: "v-main",
  components: { Carousel},
  setup(){
    const hook=reactive({
    });

    return{

    }
  }
})
</script>

<style lang="scss">
@import "scss/views/main";
.one{
  width: 1600px;
  margin: 0 auto;
  @media screen and (max-width: 1600px){
    width: 100%;
  }
}
</style>