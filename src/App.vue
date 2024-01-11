<template>
  <Navigation></Navigation>
    <router-view></router-view>
  <MobileNav></MobileNav>
</template>

<script>
import Navigation from "./components/Navigation/Navigation.vue";
import MobileNav from "./components/Mobile-Navigation/MobileNav.vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    Navigation,
    MobileNav
  },
  setup(){
    const store = useStore();
    // console.log('store', store);
    // console.log('store state', store.state.msg);
    // console.log('store msg', store.msg);
    return{
      store
    }
  }
};
</script>
<style lang="scss">
@import "./assets/scss/style.scss";
</style>