/* eslint-disable */
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import $ from "jquery";

export default {
    name: 'Contact',
    data() {
      return {
          mobileView: false,
          listOpen: false,
          showList: "",
          v$: useValidate(),
          errors: [],
          requestClass: '',
          successClass: 'hide-container',
          taglineData: {},
          userDetails: {},
          contactDetailsArr: []
      }
    },
    setup(){
      const state = reactive({
  			// name: '',
        // email: '',
  			message: '',
  		});
      const rules = computed(() => {
        return {
          // name: { required },
          // email: { required, email },
          message: { required },
        }        
      });
      const v$ = useValidate(rules, state);
      return { state, v$ }
    },
    methods: {
      checkWindow(){
        if(window.innerWidth <= 740 ){
          console.log('widow in home', window.innerWidth);
          this.mobileView = true;
        } else {
        this.mobileView = false;
        this.$forceUpdate();
        }
      },
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
      getUserDetails(){
          let webUrl = "https://eygb.sharepoint.com/sites/Creative-UK";
          axios.get(webUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties" , {
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            }
          })
          .then(response => {
            this.userDetails.Name = response.data.DisplayName;
            this.userDetails.Email = response.data.Email;
            console.log('username axios', this.userDetails.Name);
            console.log('user email axios', this.userDetails.Email);
            return this.userDetails;
          })
          .catch(function (error) {
            console.log('Error', error);
          });
      },
      getTaglineContent(){
        axios.get("siteUrl_api/web/lists/getByTitle('Lst_About')/items('2')" , {
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            }
        })
        .then(response => {
            //console.log('tagline data', response.data);
            this.taglineData = response.data;
            return this.taglineData;
        })
        .catch(function (error) {
            console.log('Error', error);
        });
      },
      getContactDetails(){
        axios.get("siteUrl_api/web/lists/getByTitle('Lst_Contact-Details')/items" , {
          headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          }
        })
        .then(response => {
          //console.log('contact details data', response.data.value);
          this.contactDetailsArr = response.data.value;
          this.contactDetailsArr = this.contactDetailsArr.sort(function (a, b) {
            return a.Order0 == b.Order0 ? 0 : a.Order0 < b.Order0 ? -1 : 1
          });
        })
        .catch(function (error) {
          console.log('Error', error);
        });
      },
      showContacts(){
        console.log('this.listOpen', this.listOpen);
        if(this.listOpen == false){
          this.listOpen = true;
          this.showList = 'show-list';
          // this.$forceUpdate();
        } else {
          this.listOpen = false;
          this.showList = '';
          // this.$forceUpdate();
        }

      },
      validations(){
        return {
          name: { required },
          email: { required },
          message: { required },
        }
      },
      sendItemToList(reqName, reqEmail, reqMessage){

        let getFormDigest = function(webUrl) {
          return $.ajax({
              url: webUrl + "/_api/contextinfo",
              method: "POST",
              processData: false,
              headers: { "Accept": "application/json; odata=verbose" }
          });
        }
      
        return getFormDigest('https://eygb.sharepoint.com/sites/Creative-UK').then(function (data) {
          $.ajax
          ({
            url: "siteUrl_api/web/lists/getbytitle('Lst_Queries')/items('2')",
            type: "POST",
            data: JSON.stringify
          ({
            __metadata:
          {
            type: "SP.Data.Lst_x005f_QueriesListItem"
          },
          "Title": reqName,
          "Email": reqEmail,
          "Message": reqMessage        
          }),
          headers:
          {
              "Accept": "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
              "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,
              "X-HTTP-Method": "MERGE",
              "If-Match": "*"
          },
          success: function(data, status, xhr){
            console.log('sent!');
          },
          error: function(xhr, status, error){
              alert('Oops, query not sent. Please contact us at: email@email.com.');
          }
          });
        });
      },
      submitRequest(){
        console.log('this.v$', this.v$);
        this.v$.$validate();
        if (!this.v$.$error) {
          // console.log('name', this.state.name);
          // console.log('email', this.state.email);
          console.log('message', this.state.message);
          this.requestClass = 'hide-container';
          this.successClass = '';
          this.sendItemToList(this.userDetails.Name, this.userDetails.Email, this.state.message);
        }
      }
    },
    mounted(){
      this.getUserDetails();
      this.checkWindow();
      window.addEventListener('resize', this.checkWindow);
      this.getTaglineContent();
      this.getContactDetails();
    }  
  }