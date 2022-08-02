<template>
    <div class="user-address">
        <nav-bar />
        <div class="user-address-container">
            <v-alert v-if="addresses.length == 0" text dense color="teal" border="left">
                <div class="py-4 px-2">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Você não possui nenhum endereço cadastrado
                </div>
            </v-alert>
            <div class="d-flex justify-end py-3">
                <v-btn class="mx-2" fab dark small color="pink">
                    <i class="fa-solid fa-plus"></i>
                </v-btn>
            </div>
            <div class="user-address-group">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Rua
                                </th>
                                <th class="text-left">
                                    Numero
                                </th>
                                <th class="text-left">
                                    Bairro
                                </th>
                                <th class="text-left">
                                    Cidade
                                </th>
                                <th class="text-left">
                                    Estado
                                </th>
                                <th class="text-left">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="address in addresses" :key="address.id">
                                <td>{{ address.street }}</td>
                                <td>{{ address.number }}</td>
                                <td>{{ address.district }}</td>
                                <td>{{ address.city }}</td>
                                <td>{{ address.uf }}</td>
                                <td><i class="fa-solid fa-trash-can"></i></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/user/NavBar.vue'
import {baseURL} from '../../lib/api';
import axios from 'axios'
export default {
    data() {
        return{
            token: localStorage.getItem('token'),
            addresses: []
        }
    },
    components: {
        NavBar
    },
    methods: {
        async loadAddress(){
            try{
                var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
                const res = await axios.get(`${baseURL}/address`, req)

                this.addresses = res.data
            }catch(err){
                console.log(err)
            }
        }
    },
    created: async function() {
        this.loadAddress()
    }
}
</script>

<style>
.user-address{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.user-address-container{
    padding: 45px 15%;
    padding-left: calc(15% + 60px);
}
</style>