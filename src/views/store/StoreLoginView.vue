<template>
    <div class="login">
       <v-card elevation="2" class="login-card">
            <v-card-title>Store Login</v-card-title>
            <form @submit.prevent="login()">
                <v-card-text>
                    <v-text-field label="Email" v-model="form.email" outlined></v-text-field>
                    <v-text-field label="Senha" v-model="form.password" outlined></v-text-field>
                    <div>{{this.form.errMessage}}</div>
                    <v-btn type="submit" depressed color="primary">
                        Entrar
                    </v-btn>
                </v-card-text>
            </form>
            
        </v-card>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return{
            form: {
                email: '',
                password: '',
                errMessage: ''
            }
        }
    },
    methods: {
        async login(){
            try{
                const res = await axios.post('http://localhost:3000/store/login', this.form);

                console.log(res);

                if(res.data.token){
                    localStorage.setItem('token', res.data.token);
                    this.$router.push({name: 'store-home'})
                }
            }catch(err){
                if(err.response.status == 401){
                    this.form.errMessage = err.response.data.message
                }
                
            }
            
        }
    }
}
</script>

<style scoped>
.login{
    background-color: #dfe4ea;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-card{
    width: clamp(350px, 50%, 700px);
}
.login-card-register-msg{
    padding: 5px 10px;
    font-size: 16px;
}
.login-card-register-msg a{
    text-decoration: none;
    font-weight: bold;
}
</style>
