<template>
  <div>
    <v-app-bar app color="deep-purple" dark>
      <v-toolbar-title>Cursos By Jhefferson</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text to="/">Inicio</v-btn>
      <v-btn text to="login" v-if="!isLogger">Entrar</v-btn>
      <v-btn text to="register" v-if="!isLogger">Registrarme</v-btn>
      <v-btn text to="my-courses" v-if="isLogger">Mis Cursos</v-btn>
      <v-btn text @click="loggout" v-if="isLogger">Cerrar Sesion</v-btn>
    </v-app-bar>
    <div class="page_container">
      <div class="courses">
        <cards-courses v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import CardsCourses from '../components/cards/CardsCourses.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      courses: [],
      isLogger: false
    }
  },
  components: {
    CardsCourses
  },
  methods: {
    ...mapActions({ A_GET_COURSES: "servicecoursesStore/A_GET_COURSES", }),
    async getCourses() {
      const { data } = await axios.get(
        process.env.VUE_APP_BASE_URL + "courses"
      );
      this.courses = data;
    },
    loggout() {
      localStorage.removeItem('token');
      localStorage.removeItem('sub');
      localStorage.removeItem('token_backoffice');
      localStorage.removeItem('sub_backoffice');
      this.$router.push('/login');
    }
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogger = true;
    }
    await this.getCourses();
  },

}
</script>

<style>
.page_container {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.courses {
  width: 75vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

}
</style>
