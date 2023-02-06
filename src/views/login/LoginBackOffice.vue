<template>
    <div class="login">
        <div class="login__container">
            <div class="login__container__title">
                <h1>Connexion</h1>
            </div>
            <div class="login__container__form">
                <form>
                    <div class="login__container__form__input">
                        <label for="username">Usuario</label>
                        <input type="text" id="username" v-model="username" @keyup.enter="login" />
                    </div>
                    <div class="login__container__form__input">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" v-model="password" @keyup.enter="login" />
                    </div>
                    <div class="login__container__form__button">
                        <button type="button" @click="login">Iniciar Session</button>
                    </div>
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
    name: 'LoginBackOffice',
    data() {
        return {
            username: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        async login() {
            const body = {
                username: this.username,
                password: this.password
            }

            try {
                const { data } = await axios.post(process.env.VUE_APP_BASE_URL + 'auth/login-backoffice', body);
                localStorage.setItem('token_backoffice', data.access_token);
                localStorage.setItem('sub_backoffice', data.sub);
                this.$router.push('/backoffice');
            } catch (error) {
                this.error = true;
                this.errorMessage = error.response.data.message;
            }
        }
    },
    created() {
        if (localStorage.getItem('token_backoffice')) {
            this.$router.push('/backoffice');
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
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

.login__container__title {
    text-align: center;
    margin-bottom: 20px;
}

.login__container__form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.login__container__form__input {
    width: 100%;
    margin-bottom: 20px;
}

.login__container__form__input label {
    display: block;
    margin-bottom: 5px;
}

.login__container__form__input input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}


.login__container__form__button {
    width: 100%;
    text-align: center;
}

.login__container__form__button button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3f51b5;
    color: #fff;
    cursor: pointer;
}

.login__container__error {
    width: 100%;
    text-align: center;
    color: #f44336;
}
</style>