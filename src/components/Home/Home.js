/* eslint-disable */
import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import * as Bootstrap from 'bootstrap';
// import 'popper.js';
import axios from "axios";
import { VueAgile } from "vue-agile";




export default {
  name: 'Home',
  component: {
    agile: VueAgile
  },
  data() {
    return {
        mobileView: false,
        aboutData: []
    }
  },
  methods: {
    checkScroll(){
        if ($('#scrollDiv').offset().top < 500) {
          $(".go-down").fadeOut(500);
        } else {
          $(".go-down").fadeIn(500);
        }
    },
    smoothScrollTo(target){   
      $('#app').animate({
          scrollTop: $(target).offset().top
      }, 1000);
    },
    checkWindow(){
      if(window.innerWidth <= 992 ){
        //console.log('widow in home', window.innerWidth);
        this.mobileView = true;
      } else {
      this.mobileView = false;
      this.$forceUpdate();
      }
    },
    getAboutData() {
      axios.get("siteUrl_api/web/lists/getByTitle('Lst_About')/items" , {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
      })
      .then(response => {
          this.aboutData = response.data.value[0];
          //console.log('about data', this.aboutData);
      })
      .catch(function (error) {
          console.log('Error', error);
      });
    },
    // simulateClick(){
    //   let video = document.getElementById("clHomeVideo");
    //   // isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    //   console.log('video paused', video.paused);       
    //   if(video.currentTime > 0 || video.paused == true){
    //     video.volume = 1;
    //     console.log('video.volume', video.volume);
    //   }
    // },
  },
  mounted(){
    // setTimeout(this.simulateClick(), 1000);    
    this.checkWindow();
    this.getAboutData();
    this.checkScroll();
    window.addEventListener('resize', this.checkWindow);
    window.addEventListener('scroll', this.checkScroll,{capture: true});
  },

}