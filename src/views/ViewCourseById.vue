<template>
    <div>
        <v-img height="400" :src="course.img"></v-img>
        <div class="d-flex justify-center pa-md-10">
            <div class="detail-course">
                <h1>{{ course.name }}</h1>
                <h3>{{ course.description }}</h3>
                <v-row align="center" class="mx-0">
                    <v-rating :value="parseTowDecimal(course.promediun)" color="amber" dense half-increments readonly
                        size="14"></v-rating>

                    <div class="grey--text ms-4">
                        {{ parseTowDecimal(course.promediun) }} ({{ course.califications }})
                    </div>
                </v-row>
                <br>
                <i>By: {{ course.autor }}</i>

                <div class="acction-course d-flex justify-end">
                    <v-btn color="purple" text :to="'/'">
                        Ver Todos los cursos
                    </v-btn>
                    <v-btn color="deep-purple" class="white--text" elevation="2" @click="suscription"
                        v-if="isNoSucription">
                        Suscribirse
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'ViewCourseById',
    data() {
        return {
            course: {
                id: 0,
                name: "",
                description: "",
                img: "",
                autor: "",
                promediun: 0,
                califications: 0,
                price: 0,
                isSuscription: false,
            },
            isNoSucription: false,
        }
    },
    methods: {
        async getCourseById() {
            const { data } = await axios.get(
                process.env.VUE_APP_BASE_URL + "courses/" + this.$route.params.id
            );
            this.course = data;
            this.isNoSucription = true;
        },
        async getCourseByIdUser() {

            const { data } = await axios.get(
                process.env.VUE_APP_BASE_URL + "courses/" + this.$route.params.id + "/user/" + localStorage.getItem("sub")
            );
            if (data.success === false) {
                return await this.getCourseById();
            }
            this.course = data;
            this.isNoSucription = false;
        },
        parseTowDecimal(number) {
            return number.toFixed(2);
        },
        async suscription() {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const course = [this.course.id]
            const { data } = await axios.put(
                process.env.VUE_APP_BASE_URL + "users/suscription/" + localStorage.getItem("sub")
                , { course }, config
            );
            await this.getCourseByIdUser();
        }
    },
    async created() {
        const sub = localStorage.getItem("sub");
        if (sub) {
            await this.getCourseByIdUser();
        } else {
            await this.getCourseById();
        }
    },
}
</script>

<style>
.detail-course {
    width: 75vw;
    padding-right: 3%;
}

.detail-course h1 {
    margin-bottom: 2.5%;
    border-bottom: 1px solid #ccc;
}

.detail-course h3 {
    margin-bottom: 2.5%;
}
</style>