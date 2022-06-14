<template>
    <!-- Modal de criação de produto -->
    <v-dialog v-model="modalAddProduct" max-width="480">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"  depressed color="error">
                Novo
            </v-btn>
        </template>
        
        <form @submit.prevent="submit()">
            <v-card>
                <v-card-title class="text-h5" style="padding: 22px 24px">Adicionar Produto</v-card-title>
                <v-card-text>
                        <v-text-field v-model="name" label="Nome" outlined></v-text-field>
                        <v-text-field v-model="description" label="Descrição. Ex: Pão, alface, tomate, hambúrguer" outlined></v-text-field>
                        <v-text-field v-model="price" type="number" label="Preço" prefix="R$" outlined></v-text-field>
                        <v-select v-model="available" :items="items" item-text="text" item-value="value" label="Status" outlined></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="modalAddProduct = false">
                        Fechar
                    </v-btn>
                    <v-btn type="submit" color="green darken-1" text>
                        Cadastrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            modalAddProduct: false,
            name: '',
            description: '',
            price: '',
            available: { text: 'Ativo', value: '1' },
            items: [
                { text: 'Ativo', value: '1' },
                { text: 'Inativo', value: '0' }
            ],
            token: localStorage.getItem('token')
        }
    },
    props: {
        categoryId: Number,
        categoryName: String
    },
    methods: {
        async submit(){
            var req = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }

            const available = this.available.value ? this.available.value : this.available;
            const data = {
                name: this.name,
                description: this.description,
                price: this.price,
                categoryId: this.categoryId,
                available
            }

            data.description.length == 0 && delete data.description

            console.log(req);

            try{
                await axios.post(`http://localhost:3000/product`, data, req);
                this.$emit('productRegistered', this.categoryId, this.categoryName);
                this.modalAddProduct = false;
                this.cleanFields();
            }catch(err){
                
                console.log(err);
            }
            
        },
        cleanFields(){
            this.name = '',
            this.description = '',
            this.price = '',
            this.available ={ text: 'Ativo', value: '1' }
        }
    }
}
</script>
