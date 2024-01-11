/* eslint-disable */
import axios from "axios";
import { useStore } from "vuex";

export default {
    name: 'Showcase',
    data() {
      return {
        mobileView: false,
        showcaseProjects: [],
        services: []
      }
    },
    setup(){
      const store = useStore();
      return{
      store
      }
    },
    methods: {
      checkWindow(){
        if(window.innerWidth <= 992 ){
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
            //console.log('services data', response.data.value);
            this.services = response.data.value;
        })
      .catch(function (error) {
            console.log('Error', error);
        });
      },
      getServiceTags(array){
        array.forEach(item=>{
          if(item.ServicesId.length > 0){
            item.serviceNameArr = [];
            item.ServicesId.forEach(serviceId=>{
              this.services.forEach(service=>{
                if(serviceId == service.ID){
                  item.serviceNameArr.push(service.Title);
                }
              });
            })
          }
        });
        return array
      },
      getProjectData: function (listName, idArray) {
        axios.get("siteUrl_api/web/lists/getByTitle('Lst_" + listName + "')/items" , {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
        })
        .then(response => {
            //console.log('response projects', response.data.value);
            let responseArr = response.data.value;
            idArray.forEach(id =>{
              responseArr.forEach(item=>{
                if(item.ID == id){
                  this.showcaseProjects.push(item);
                }
              });
            });
            this.showcaseProjects = this.getServiceTags(this.showcaseProjects);
            this.showcaseProjects = this.showcaseProjects.sort(function (a, b) {
              return a.Title == b.Title ? 0 : a.Title < b.Title ? -1 : 1
            });
            // this.showcaseProjects.push(...responseArr);
            //console.log('this.showcaseProjects ', this.showcaseProjects);
        })
       .catch(function (error) {
             console.log('Error', error);
        });
      },
      getShowcaseData() {
        axios.get("siteUrl_api/web/lists/getByTitle('Lst_Showcase-Projects')/items" , {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
        })
        .then(response => {
            let showCaseData = response.data.value[0];
            //console.log('showcase data', showCaseData);

            if(showCaseData.Doc_x002d_Design_x002d_ProjectsId.length > 0){
                this.getProjectData('Doc-Design-Projects', showCaseData.Doc_x002d_Design_x002d_ProjectsId);
            }
            if(showCaseData.F_x002d_and_x002d_E_x002d_ProjecId.length > 0){
                this.getProjectData('F-and-E-Projects', showCaseData.F_x002d_and_x002d_E_x002d_ProjecId);
            } 
            if(showCaseData.Motion_x002d_Graphics_x002d_ProjId.length > 0){
              this.getProjectData('Motion-Graphics-Projects', showCaseData.Motion_x002d_Graphics_x002d_ProjId);
            }
            if(showCaseData.Print_x002d_Doc_x002d_ProjectsId.length > 0){
              this.getProjectData('Print-Doc-Projects', showCaseData.Print_x002d_Doc_x002d_ProjectsId);
            }
            if(showCaseData.Web_x002d_Dev_x002d_ProjectsId.length > 0){
              this.getProjectData('Web-Dev-Projects', showCaseData.Web_x002d_Dev_x002d_ProjectsId);
            }
        })
        .catch(function (error) {
            console.log('Error', error);
        });
      },
      sendProjectData(project){
        this.store.commit('setProject', project);
        if(project.ServicesId.length > 1){
          this.store.commit('setService', 'Multi-Stream');
        } else {
          this.services.forEach(service=>{
            if(service.ID == project.ServicesId[0]){
              this.store.commit('setService', service.Title);
            }
          });
        }
        this.store.commit('setRouteValue', 'showcase');  
      } 
    },
    mounted(){
        window.scrollTo(0, 0);
        this.checkWindow();
        window.addEventListener('resize', this.checkWindow);
        this.getServicesData();
        this.getShowcaseData();
    },
  
    }