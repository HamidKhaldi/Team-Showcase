/* eslint-disable */
import $ from "jquery";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: 'Home',
  data() {
    return {
        mobileView: false,
        projectTitle: this.$route.params.title,
        selectedProject: {},
        selectedService: '',
        selectedRoute: '',
        listNameArr: ['Lst_Doc-Design-Projects', 'Lst_F-and-E-Projects', 'Lst_Motion-Graphics-Projects', 'Lst_Print-Doc-Projects', 'Lst_Web-Dev-Projects'],
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
    getKeywordTags(project){
      axios.get("siteUrl_api/web/lists/getByTitle('Lst_Keywords')/items" , {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        let keywordData = response.data.value;
        // console.log('keyword data', keywordData);
        if(project.KeywordsId.length > 0){
          project.keywordNamesArr = [];
          project.KeywordsId.forEach(keywordId=>{
            keywordData.forEach(keyword=>{
              if(keyword.ID == keywordId){
                project.keywordNamesArr.push(keyword.Title);
              }
            })
          });  
        }
        // console.log('project with keywords', project);
        return project;     
      })
      .catch(function (error) {
        console.log('Error', error);
      });
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
    getServiceTags(project){
        if(project.ServicesId.length > 0){
          project.serviceNameArr = [];
          project.ServicesId.forEach(serviceId=>{
            this.services.forEach(service=>{
              if(serviceId == service.ID){
                project.serviceNameArr.push(service.Title);
              }
            });
          })
          if(project.serviceNameArr.length == 1){
            this.selectedService = project.serviceNameArr[0];
          } else {
            this.selectedService = 'Multi-Stream';
          }
        }
    },
    getProjectDataWithTitle(projectTitle){
      this.listNameArr.forEach(listName=>{
        axios.get("siteUrl_api/web/lists/getByTitle('" + listName + "')/items" , {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        })
        .then(response => {
            response.data.value.forEach(value=>{
              if(value.Title == projectTitle){
                //console.log('matched value ', value);
                //console.log('quote value ', value.Quote_x002d_Content);
                if(value.Quote_x002d_Content == '<br>'){
                  value.Quote_x002d_Content = null;
                }
                this.selectedProject = value;
                this.getServiceTags(this.selectedProject);
                this.getKeywordTags(this.selectedProject);
                // console.log('this.selectedProject', this.selectedProject);                
                this.selectedRoute = 'services';
              }
            });
            
        })
        .catch(function (error) {
            console.log('Error', error);
        });
      });
    },
    getProjectData(project, service){
      this.selectedProject = project;
      this.selectedService = service;
      this.getKeywordTags(this.selectedProject);
      this.selectedRoute = this.store.state.routeValue;
      //console.log('selected project ', this.selectedProject);
    },
    checkWindow(){
      if(window.innerWidth <= 992 ){
        //console.log('widow in home', window.innerWidth);
        this.mobileView = true;
      } else {
      this.mobileView = false;
      this.$forceUpdate();
      }
    }
  },
  mounted(){
      window.scrollTo(0, 0);
      if(this.store.state.selectedProject && this.store.state.selectedService){
        this.getProjectData(this.store.state.selectedProject, this.store.state.selectedService);
      } else {
        //console.log('params title', this.projectTitle);
        this.getServicesData();
        this.getProjectDataWithTitle(this.projectTitle);
      }      
      this.checkWindow();
  },

  }

