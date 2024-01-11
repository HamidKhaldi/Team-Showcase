import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    msg : "please work!",
    selectedProject: {},
    selectedService: '',
    routeValue: ''
  },
  plugins: [createPersistedState()],
  mutations: {
    setProject (state, newProject) {
      state.selectedProject = newProject;
    },
    setService(state, newService){
      state.selectedService = newService;
    },
    setRouteValue(state, newRoute){
      state.routeValue = newRoute;
    }
  },
  actions: {},
  modules: {},
});
