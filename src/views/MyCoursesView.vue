<template>
    <div>
        <v-app-bar app color="deep-purple" dark>
            <v-toolbar-title>Cursos By Jhefferson</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text to="/">Inicio</v-btn>
            <v-btn text to="my-courses">Mis Cursos</v-btn>
            <v-btn text @click="loggout">Cerrar Sesion</v-btn>
        </v-app-bar>
        <div class="page_container">
            <div class="courses">
                <cards-courses v-for="course in courses" :key="course.id" :course="course" :no-calification="false" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import CardsCourses from '../components/cards/CardsCourses.vue'

export default {
    name: 'MyCoursesView',
    data() {
        return {
            courses: [],
        }
    },
    components: {
        CardsCourses
    },
    methods: {
        async getCourses() {
            const sub = localStorage.getItem('sub');
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get(
                process.env.VUE_APP_BASE_URL + "users/" + sub,
                config
            );
            this.courses = data.courses;
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
        if (!token) {
            this.$router.push('/login');
        }
        await this.getCourses();
    },
    updated() {

    }
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