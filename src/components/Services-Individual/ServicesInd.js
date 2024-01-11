
/* eslint-disable */
import axios from "axios";
import Project from "../Project/Project.vue";
import { useStore } from "vuex";

export default {
    name: "ServicesInd",
    components:{
        Project
    },
    data() {
        return {
            mobileView: false,
            serviceTitle: this.$route.params.title,
            selectedService: null,
            selectedServiceTitle: this.$route.params.title,
            listNameArr: ['Lst_Doc-Design-Projects', 'Lst_F-and-E-Projects', 'Lst_Motion-Graphics-Projects', 'Lst_Print-Doc-Projects', 'Lst_Web-Dev-Projects'],
            services: [],
            relatedProjects: []
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
                    this.mobileView = true;
            } else {
                    this.mobileView = false;
            }
        },
        getRelatedProjects(serviceID){
            this.listNameArr.forEach(listName=>{
              axios.get("siteUrl_api/web/lists/getByTitle('" + listName + "')/items" , {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                }
              })
              .then(response => {
                response.data.value.forEach(project=>{
                    if(project.ServicesId.length > 0){
                        project.ServicesId.forEach(serviceId=>{                        
                            if(serviceId == serviceID){
                               this.relatedProjects.push(project);
                               this.relatedProjects = this.relatedProjects.sort(function (a, b) {
                                return a.Created == b.Created ? 0 : a.Created > b.Created ? -1 : 1
                              });
                            }
                        })
                    }
                });
                //console.log('related projects 3', this.relatedProjects);   
              })
              .catch(function (error) {
                  console.log('Error', error);
              });
            });
        },
        // getProjectsData(listName, serviceID){
        //     axios.get("siteUrl_api/web/lists/getByTitle('" + listName + "')/items" , {
        //         headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Content-Type": "application/json",
        //         }
        //     })
        //     .then(response => {
        //         console.log('projects data', response.data.value);
        //         let projectsResult = response.data.value;
        //         projectsResult.forEach(result =>{
        //             if(result.ServicesId.length> 0){
        //                 result.ServicesId.forEach(serviceId=>{
        //                     if (serviceId == serviceID){
        //                         this.relatedProjects.push(result);
        //                     }
        //                 });
        //             }
        //         });
        //         console.log('this.relatedProjects ', this.relatedProjects);
        //     })
        // .catch(function (error) {
        //         console.log('Error', error);
        //     });
        // },
        getServiceData(serviceTitle){
            console.log('serviceTitle::: ', serviceTitle);
            axios.get("siteUrl_api/web/lists/getByTitle('Lst_Services')/items" , {
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                }
            })
            .then(response => {
                //console.log('services data', response.data.value);
                this.services = response.data.value;
                this.services.forEach(service=>{
                    if(service.Title == this.serviceTitle){
                        this.selectedService = service;
                    }
                
                });
                //console.log('selected service ', this.selectedService);
                this.getRelatedProjects(this.selectedService.ID);
            })
        .catch(function (error) {
                console.log('Error', error);
            });
        },
        sendProjectData(project, service){
            this.store.commit('setProject', project);
            this.store.commit('setService', service);
            this.store.commit('setRouteValue', 'service');
        }
    },
    created(){
        this.getServiceData(this.serviceTitle);
    },
    mounted() {
        window.scrollTo(0, 0);
        this.checkWindow();        
        window.addEventListener('resize', this.checkWindow);
        //console.log('route params title', this.serviceTitle);
        //console.log('store in service', this.store);
    }
 
};