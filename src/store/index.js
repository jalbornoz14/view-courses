import Vue from "vue";
import Vuex from "vuex";

import serviceauthStore from "@/services/auth/auth.store";
import servicecoursesStore from "@/services/courses/courses.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    serviceauthStore,
    servicecoursesStore,
  },
  strict: process.env.DEV,
});
