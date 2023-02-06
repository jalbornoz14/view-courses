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
                    <v-btn color="info" class="white--text" elevation="2" @click="valuing" v-if="course.calificationByUser === null">
                        Valorar
                    </v-btn>
                </div>
            </div>
        </div>
        <v-dialog v-model="modal" max-width="400px">
            <v-card>
                <v-card-title>
                    Calificar Curso
                </v-card-title>
                <v-card-text>
                    <v-rating hover length="5" size="40" value="5" v-model="calification"></v-rating>
                </v-card-text>
                <v-card-text class="d-flex justify-end">
                    <v-btn color="success" @click="setCalification">
                        Enviar
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
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
                calificationByUser: 0,
            },
            isNoSucription: false,
            modal: false,
            calification: 5,
        }
    },
    methods: {
        valuing() {
            this.modal = true;
        },
        async setCalification() {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const body = {
                calification: this.calification,
                idUser: localStorage.getItem("sub"),
                idCourse: this.course.id
            }
            const { data } = await axios.post(
                process.env.VUE_APP_BASE_URL + "courses/califiacation"
                , body
                , config
            );
            this.modal = false;
            this.getCourseByIdUser();
        },
        async getCourseById() {
            const { data } = await axios.get(
                process.env.VUE_APP_BASE_URL + "courses/" + this.$route.params.id
            );
            this.course = data;
            this.isNoSucription = true;
        },
        async getCourseByIdUser() {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get(
                process.env.VUE_APP_BASE_URL + "courses/" + this.$route.params.id + "/user/" + localStorage.getItem("sub")
                , config
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
            if (!token){
                return this.$router.push("/login");
            }
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