import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAgile from "vue-agile";
// import { CorsRequest } from "cors";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPhone, faAngleRight, faQuoteLeft, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import 'animate.css';

library.add(faPhone, faAngleRight, faQuoteLeft, faTimes);

createApp(App).use(store).use(router, axios).use(VueAgile).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
