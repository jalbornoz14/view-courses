<template>
    <div class="login">
        <div class="login__container">
            <div class="login__container__title">
                <h1>Connexion</h1>
            </div>
            <div class="login__container__form">
                <form>
                    <div class="login__container__form__input">
                        <v-text-field label="Usuario" :rules="rules" hide-details="auto" v-model="username"
                            @keyup.enter="login"></v-text-field>
                    </div>
                    <div class="login__container__form__input">
                        <v-text-field label="Contraseña" :rules="rules" hide-details="auto" type="password"
                            v-model="password" @keyup.enter="login"></v-text-field>
                    </div>
                    <div class="login__container__form__button">
                        <button type="button" @click="login">Entrar</button>
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
        }
    },
    methods: {
        login() {
            axios.post(process.env.VUE_APP_BASE_URL + 'auth/login', {
                username: this.username,
                password: this.password
            }).then((response) => {
                this.error = false;
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('sub', response.data.sub);
                this.$router.push('/my-courses');
            }).catch((error) => {
                console.log(error);
                this.error = true;
                this.errorMessage = error.response.data.message;
            });
        }
    },
    created() {
        const token = localStorage.getItem('token');
        if (token) {
            this.$router.push('/my-courses');
        }
    }

}
</script>

<style>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login__container {
    width: 500px;
    height: 500px;
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
    height: 50px;
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
    height: 300px;
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