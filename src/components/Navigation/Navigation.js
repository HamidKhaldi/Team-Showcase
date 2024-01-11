/* eslint-disable */

import $ from "jquery";

var windowWidth = $(window).width();
export default {
    name: "Navigation",
    data() {
        return {
            mobileLogo: '',
            mobileView: false,
            bgColor: '',
            mobileHeading: ''
        }
    },
    methods: {  
       checkWindow(){
           if(window.innerWidth <= 992 ){
                //console.log('widow in nav', window.innerWidth);
                this.mobileLogo = 'mobile-logo',
                this.bgColor = 'dark-bg';
                this.mobileHeading = 'mobile-heading';
                this.mobileView = true;
           } else {
                this.mobileLogo = '',
                this.mobileView = false;
                this.bgColor = '';
                this.mobileHeading = '';
                this.$forceUpdate();
           }
       },
       smoothScrollTo(){
        $('#app').animate({
            scrollTop: 900
        }, 1000);
      },
    },
    mounted() {
        this.checkWindow();
        window.addEventListener('resize', this.checkWindow);
    }
 
};
