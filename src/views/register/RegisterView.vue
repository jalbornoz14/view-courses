<template>
    <div class="login">
        <div class="login__container">
            <div class="login__container__title">
                <h1>Registrame a los Cursos</h1>
            </div>
            <div class="login__container__form">
                <form>
                    <div class="login__container__form__input">
                        <v-text-field label="Usuario" :rules="rules" hide-details="auto" v-model="username"
                            @keyup.enter="register"></v-text-field>
                    </div>
                    <div class="login__container__form__input">
                        <v-text-field label="Contraseña" :rules="rules" hide-details="auto" type="password"
                            v-model="password" @keyup.enter="register"></v-text-field>
                    </div>
                    <div class="login__container__form__input">
                        <v-text-field label="Repitir Contraseña" :rules="rules" hide-details="auto" type="password"
                            v-model="replyPassword" @keyup.enter="register"></v-text-field>
                    </div>
                    <div class="login__container__form__input">
                        <v-select :items="profiles" label="Elige tu Perfil" v-model="profileSelected"></v-select>
                    </div>
                    <div class="login__container__form__button">
                        <button type="button" @click="register">Registrarme</button>
                    </div>
                    <br>
                    <v-btn type="button" text to="/">Volver a los Cursos</v-btn>
                </form>
            </div>
            <div class="login__container__error" v-if="error">
                <p>{{ errorMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            error: false,
            errorMessage: '',
            rules: [
                value => !!value || 'Required.',
            ],
            profiles: [],
            profileSelected: null,
        }
    },
    methods: {
        async register() {
            if (this.password === this.replyPassword) {
                await axios.post(process.env.VUE_APP_BASE_URL + 'users', {
                    username: this.username,
                    password: this.password,
                    profile: this.profileSelected,
                }).then((response) => {
                    if (response.data.success) {
                        this.$router.push('/login');
                    }else{
                        this.error = true;
                        this.errorMessage = response.data.message;
                    }
                }).catch((error) => {
                    console.log(error);
                    this.error = true;
                    this.errorMessage = error.response.data.message;
                });
            } else {
                this.error = true;
                this.errorMessage = "Las contraseñas no coinciden";
            }
        },

        async getProfiles() {
            await axios.get(process.env.VUE_APP_BASE_URL + 'profile').then((response) => {
                this.profiles = response.data.map((profile) => {
                    return {
                        text: profile.name,
                        value: profile.id
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    async created() {
        await this.getProfiles()
        if (localStorage.getItem('token')) {
            this.$router.push('/my-courses');
        }
    }

}
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login__container {
    width: 500px;
    height: 600px;
    background-color: #c598ffbf;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login__container__title {
    width: 100%;
    height: 60px;
    background-color: #7f1ee6;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login__container__form {
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login__container__form form {
    width: 60%;

}

.login__container__form__input {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login__container__form__input input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 0px;
}

.login__container__form__input .v-input {
    width: 100%;
}

.login__container__form__button {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login__container__form__button button {
    width: 100%;
    background-color: #7f1ee6;
    color: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

.login__container__error {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login__container__error p {
    color: red;
    font-size: 14px;
    font-weight: 600;
}
</style>