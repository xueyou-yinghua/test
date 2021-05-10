<template>
  <div class="sk-carousel">
    <div class="sk-carousel-centre"
         @mouseenter="uptShow(true)"
         @mouseleave="uptShow(false)"
         :style="heightStyle">
      <transition name="left">
        <button
            v-show="show"
            @click="last"
            class="carousel-btn carousel-btn-left">
          <i class="icon-left"></i>
        </button>
      </transition>
      <transition name="right">
        <button
            v-show="show"
            @click="next"
            class="carousel-btn carousel-btn-right">
          <i class="icon-right"></i>
        </button>
      </transition>
      <div class="sk-carousel-item"
           :class="ic(item.id)"
           :style="itemStyle[item.id]"
           v-for="item in listView"
           :key="item.id">
        {{item.url}}
      </div>
    </div>

    <ul class="sk-carousel-ul">
      <li class="sk-carousel-li"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, onMounted, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import type { StoreType } from "../../design/type/store";
import {routerText} from "../../design/type/indexOne";
import set = Reflect.set;

type pe=routerText[]

export default defineComponent({
  name: "carousel",
  setup(props,context){
    const store=useStore<StoreType>();

    /*ref*/
    const show=ref(false);
    const key=ref(0);
    const listView=ref<pe>(
        [
          {id:0,url:'0'},
          {id:1,url:'1'},
          {id:2,url:'2'},
          {id:3,url:'3'},
          {id:4,url:'4'}
        ]);
    const itemStyle=ref<string[]>(Array(5).fill(''));

    /*常量*/
    let time=0;
    let time1=0;
    let time2=0;
    const length=listView.value.length;
    const leftLength=(length%2===0?length:length+1)/2-1;
    const rightLength=length-1-leftLength;

    const start=()=>{
      if(time===0){
        time=setInterval(()=>{
          key.value=(key.value+1)%length;
        },3000);
      }
    };
    const end=()=>{
      clearInterval(time);
      time=0;
    };
    const next=()=>{
      if(time1===0){
        key.value=(key.value+1)%length;
        time1=1;
        setTimeout(()=>{
          time1=0;
        },600)
      }
    };
    const last=()=>{
      if(time2===0){
        key.value=(key.value+length-1)%length;
        time2=1;
        setTimeout(()=>{
          time2=0;
        },600)
      }
    };

    watchEffect(() => {
      const leftArr:number[]=[];
      for(let i=1;i<=leftLength;i++){
        leftArr.push((key.value+length-i)%length);
      }
      const rightArr:number[]=[];
      for(let i=1;i<=rightLength;i++){
        rightArr.push((key.value+i)%length);
      }
      console.log(leftArr,rightArr);
      console.log(key.value);
      listView.value.forEach(((val, index:number) => {
        if(index===key.value){
          itemStyle.value[index]=`transform:translateX(0%)`;
        }else if(leftArr.includes(index)){
          let index1=leftArr.indexOf(index);
          itemStyle.value[index]=`transform:translateX(${(index1+1)*-100}%)`;
        }else if(rightArr.includes(index)){
          let index1=rightArr.indexOf(index);
          itemStyle.value[index]=`transform:translateX(${(index1+1)*100}%)`;
        }
      }));
      console.log(itemStyle.value[0]);
    });

    const itemClass=computed(()=>{
      return (num:number)=>{
        if(key.value===num){
          return 'is-active';
        }else if(Math.abs(key.value-num)===1||Math.abs(key.value-num)===length-1){
          return 'is-animation';
        }else{
          return '';
        }
      }
    });

    //显示按钮
    const uptShow=(data:boolean)=>{
      show.value=data;
      if(data){
        end();
      }else{
        start();
      }
    };

    //获取高度
    let heightStyle=computed(()=>{
      let value=store.state.area.width>1600?1600:store.state.area.width;
      return `height:${value/4}px`;
    });

    onMounted(()=>{
      start();
    });
    return{
      show,
      ic:itemClass,
      itemStyle,
      listView,
      uptShow,
      heightStyle,
      last,
      next,
    }
  }
})
</script>

<style lang="scss">
@import "scss/components/carousel";
</style>