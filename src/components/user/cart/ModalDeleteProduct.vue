<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                    <a v-bind="attrs" v-on="on" class="btn btn-danger table-btn" data-bs-toggle="modal"><i class="fas fa-trash-alt"></i></a>
            </template>
            <v-card>
                <v-form @submit.prevent="deleteProduct()">
                    <v-card-title>
                    <span class="text-h5">
                        <v-icon style="color: #2b2b2b">
                            mdi-delete
                        </v-icon>
                        Excluir produto
                    </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            Deseja realmente apagar o produto <b>{{this.nameProduct }}</b> do carrinho?
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Fechar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            type="submit"
                        >
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import {baseURL} from '../../../lib/api'
export default {
    data() {
        return{
            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            dialog: false
        }
    },
    props: {
        idProduct: Number,
        nameProduct: String
    },
    methods: {
        async deleteProduct(){
            try{
                await axios.delete(`${baseURL}/userProduct/${this.idProduct}`, this.req)
                this.dialog = false
                this.$router.go()
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>
.table-btn{
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    background-color: #e8e6e6;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
.table-btn i{
    color: #11101d;
}
.table-btn:hover i, .table-btn:focus i{ 
    color: crimson;
}
</style>