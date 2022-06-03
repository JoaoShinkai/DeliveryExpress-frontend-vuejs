<template>
    <div class="login">
        <v-card elevation="2" class="login-card">
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-text-field label="Email" outlined></v-text-field>
                <v-text-field label="Senha" outlined></v-text-field>
                <div class="login-card-register-msg">Não possui uma conta? <router-link to="/register"> <a href="">Cadastre-se</a></router-link></div>
                <br>
                <v-btn depressed color="primary">
                    Entrar
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

export default{
    data(){
        return{

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
