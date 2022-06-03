<template>
    <div class="register">
        <v-card elevation="2" class="register-card">
            <v-card-title>Cadastre-se</v-card-title>
            <v-form @submit.prevent="submit()">
                <v-card-text>
                    <v-text-field label="Nome" :error-messages="error.name" v-model="form.name" outlined></v-text-field>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Telefone/Celular" :error-messages="error.phone" v-model="form.phone" outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field type="date" label="Data de Nascimento" :error-messages="error.birthDate" v-model="form.birthDate" outlined></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field label="Email" :error-messages="error.email" v-model="form.email" outlined></v-text-field>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field type="password" label="Senha" :error-messages="error.password" v-model="form.password" outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field type="password" label="Confirmar Senha" :error-messages="error.confirmPassword" v-model="form.confirmPassword" outlined></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn type="submit" depressed color="primary">
                        Cadastrar
                    </v-btn>
                </v-card-text>
            </v-form>
            
        </v-card>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return{
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                birthDate: ''
            },
            error: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                birthDate: ''
            },
            isValidData: false
        }
    },
    methods: {
        async submit(){
            this.isValidData = true;
            this.cleanErrors();

            if(this.form.name.length < 3) {
                this.error.name = 'Deve conter ao menos 3 caracteres';
                this.isValidData = false;
            }
            if(this.form.phone.length < 13 || this.form.phone.length > 14){
                this.error.phone = '(00)99999-9999 ou (00)9999-9999';
                this.isValidData = false;
            }
            if(this.form.birthDate == ""){
                this.error.birthDate = 'Campo obrigatório';
                this.isValidData = false;
            }
            if(!this.validateEmail(this.form.email)){
                this.error.email = 'Deve ser um email válido';
                this.isValidData = false;
            }
            if(this.form.password.length < 4){
                this.error.password = 'Mínimo de 4 caracteres';
                this.isValidData = false;
            }
            else if(this.form.password != this.form.confirmPassword){
                this.error.confirmPassword = 'Senhas devem ser iguais';
                this.isValidData = false;
            }

            if(this.isValidData){
                try{
                    await axios.post(`http://localhost:3000/users`, this.form);

                    this.$router.push({name: 'login'});
                }catch(err){
                    console.log(err);
                }
            }
            
        },
        validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        cleanErrors(){
            this.error.name = '',
            this.error.email = '',
            this.error.password = '',
            this.error.confirmPassword = '',
            this.error.phone = '',
            this.error.birthDate = ''
        }
    }
}
</script>

<style scoped>
.register{
    background-color: #dfe4ea;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
}
.register-card{
    width: clamp(350px, 50%, 700px);
}
</style>
