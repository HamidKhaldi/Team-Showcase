/* eslint-disable */
import axios from "axios";
import ServicesInd from "../Services-Individual/ServicesInd.vue";

export default {
  name: 'Services',
  components: {
    ServicesInd
  },
  data() {
    return {
        mobileView: false,
        services: [],
        selectedService: null
    }
  },
  methods: {
    checkWindow(){
      if(window.innerWidth <=740 ){
        //console.log('widow in home', window.innerWidth);
        this.mobileView = true;
      } else {
      this.mobileView = false;
      this.$forceUpdate();
      }
    },
    getServicesData() {
      axios.get("siteUrl_api/web/lists/getByTitle('Lst_Services')/items" , {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
      })
      .then(response => {
          //console.log('services data 111', response.data.value);
          this.services = response.data.value;
          this.services.forEach(service=>{
            service.Background_x002d_Image ? service.Image = service.Background_x002d_Image.Url : service.Image = '';
          });
      })
    .catch(function (error) {
          console.log('Error', error);
      });
    },
    getServiceDetails(service){
      //console.log('service ', service.Title);
      this.selectedService = service;
    },
    
  },
  mounted(){
      window.scrollTo(0, 0);
      this.getServicesData();
      this.checkWindow();
      window.addEventListener('resize', this.checkWindow);
  },

  }