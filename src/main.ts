import { createApp } from 'vue'
import Sakura from './Sakura.vue';
import router from "./router";
import store from "./store";
import '../scss/index.scss';

const sakura=createApp(Sakura).use(router).use(store);

sakura.config.errorHandler=(err, instance, info) => {
  console.log(err,instance,info);
};


sakura.mount('#sakura');
