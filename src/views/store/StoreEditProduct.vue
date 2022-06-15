<template>
    <div class="store-edit-product">
        <store-nav-bar/>
        <div class="store-edit-product-container">
            <v-card class="store-edit-product-container-info">
                <v-card-title>Edição</v-card-title>
                <v-card-text style="font-size: 16px">
                    
                    
                    <form @submit.prevent="submitEdit()">
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-text-field v-model="product.name" label="Nome" outlined></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field type="number" step="0.01" v-model="product.price" label="Preço" outlined></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-select v-model="product.available" :items="items" item-text="text" item-value="value" label="Status" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="product.description" label="Descrição" outlined></v-text-field>
                        <div class="store-edit-product-container-info-form-divBtn">
                            <v-btn type="submit" color="#11101d" style="color: white">Enviar</v-btn>
                        </div>
                    </form>
                </v-card-text>
            
            </v-card>
            <div class="card-adicionais">
                <v-card>
                    <v-card-title>Adicionais</v-card-title>
                    <v-card-text>
                        <form @submit.prevent="createAdditional()">
                            <v-text-field v-model="createAdditionalProps.name" label="Novo adicional" outlined></v-text-field>
                            <div class="card-adicionais-novo-divBtn">
                                <v-btn type="submit"  color="#11101d" style="color: white">Adicionar</v-btn>
                            </div>
                        </form>
                        
                    </v-card-text>
                </v-card>
                <v-card class="card-adicionais-item" v-for="additional in additionals" :key="additional.id">
                    <v-card-title>
                        <div class="card-adicionais-item-title">
                            <div>{{additional.name}}</div>
                            <v-btn @click="deleteAdditional(additional)" fab dark color="error" small style="box-shadow: none; font-size: 16px">
                                <i class="fa-solid fa-trash"></i>
                            </v-btn>
                        </div>
                    </v-card-title>
                    
                    <hr>
                    <v-card-text style="color: #2b2b2b; font-size: 16px">
                        <div class="card-adicionais-item-option" v-for="optionAdditional in additional.optionAdditionals" :key="optionAdditional.id">
                            <div class="card-adicionais-item-option-name">{{optionAdditional.name}}</div>
                            <div class="card-adicionais-item-option-price">{{optionAdditional.price}}</div>
                        </div>
                        <div class="card-adicionais-item-newOption">
                            
                            <form :id="additional.id" @submit.prevent="createOptionAdditional(additional.id)">
                                <v-row>
                                    <v-col cols="12" sm="9">
                                        <v-text-field ref="inputRef" clearable label="Adicional" outlined dense required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field ref="inputRef" clearable type="number" step="0.01" label="Valor adicional" prefix="R$" outlined dense required></v-text-field>
                                    </v-col>
                                </v-row>
                                <div class="card-adicionais-novo-divBtn">
                                    <v-btn color="error" style="color: white" type="submit">Adicionar</v-btn>
                                </div>
                            </form>
                        </div>
                        
                    </v-card-text>
                    
                </v-card>
            </div>
        </div>

        <!-- Alerta de sucesso -->
        <v-snackbar v-model="snackbar" color="green" style="justify-content: end; align-items: flex-start">
            Atualizado com sucesso
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                Fechar
                </v-btn>
            </template>
        </v-snackbar>

        <!-- Modal de exclusão de adicional -->
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="body-1">Deseja realmente deletar o adicional <b style="margin-left: 5px"> {{modalDeleteAdditional.name}}</b>?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false" >Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteAdditionalConfirm()" >OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    
</template>

<script>
import StoreNavBar from '../../components/store/StoreNavBar.vue'
import axios from 'axios'
// import jwt_decode from 'jwt-decode';

export default {
    data() {
        return{
            dialogDelete: false,
            snackbar: false,
            token: localStorage.getItem('token'),
            items: [
                { text: 'Ativo', value: '1' },
                { text: 'Inativo', value: '0' }
            ],
            product: {
                id: '',
                name: '',
                price: '',
                description: '',
                available: ''
            },
            createAdditionalProps: {
                name: '',
                multiple: 0
            },
            createOptionAdditionalProps: {
                name: '',
                price: ''
            },
            modalDeleteAdditional: {
                id: '',
                name: ''
            },
            additionals: []
        }
    },
    components: {
        StoreNavBar
    },
    methods: {
        async loadProduct(){
            try{
                const productId = this.$route.params.id;

                const product = await axios.get(`http://localhost:3000/product/${productId}`)

                if(product.data.available == 1){
                    product.data.available = { text: 'Ativo', value: '1' };
                }
                else{
                    product.data.available = { text: 'Inativo', value: '0' };
                }

                this.product = product.data;

                
            }catch(err){
                console.log(err);
            }
        },

        async loadAdditionals(){
            try{
                const productId = this.$route.params.id;
                const additionals = await axios.get(`http://localhost:3000/additional/product/${productId}`);

                this.additionals = additionals.data;
            }catch(err){
                console.log(err);
            }
        },

        async submitEdit(){
            const available = this.product.available.value ? this.product.available.value : this.product.available;
            const data = {
                name: this.product.name,
                description: this.product.description,
                price: this.product.price,
                available
            }

            try{
                await axios.put(`http://localhost:3000/product/${this.product.id}`, data);
                this.snackbar = true;
            }catch(err){
                console.log(err);
            }
        },

        async createAdditional(){
            try{
                const productId = this.$route.params.id;
                const data = {
                    name: this.createAdditionalProps.name,
                    multiple: this.createAdditionalProps.multiple,
                    productId
                }

                await axios.post(`http://localhost:3000/additional/`, data);
                this.loadAdditionals();
                this.cleanCreateAdditionalFields();
            }catch(err){
                console.log(err);
            }
        },

        async createOptionAdditional(id){
            const name = document.getElementById(id).getElementsByTagName('input')[0].value;
            const price = document.getElementById(id).getElementsByTagName('input')[1].value;

            const data = {
                name,
                price,
                additionalId: id
            }

            try{
                await axios.post('http://localhost:3000/optionAdditional', data);
                this.loadAdditionals();

                document.getElementById(id).getElementsByClassName('v-input__append-inner')[1].getElementsByTagName('button')[0].click();
                document.getElementById(id).getElementsByClassName('v-input__append-inner')[0].getElementsByTagName('button')[0].click();
            }catch(err){
                console.log(err);
            }
        },

        deleteAdditional(additional){
            this.modalDeleteAdditional = additional;
            this.dialogDelete = true;
        },

        async deleteAdditionalConfirm(){
            try{
                await axios.delete(`http://localhost:3000/additional/${this.modalDeleteAdditional.id}`);
                this.loadAdditionals();
                this.dialogDelete = false;
            }catch(err){
                console.log(err);
            }
        },

        cleanCreateAdditionalFields(){
            this.createAdditionalProps.name = '';
        }
    },
    created: async function(){
        await this.loadProduct();
        await this.loadAdditionals();
    }
}
</script>
<style scoped>
hr{
    margin: .4rem 0;
    color: inherit;
    background-color: currentColor;
    border: 0;
    opacity: .25;
    height: 1px;
}
.store-edit-product{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-edit-product-container{
    margin-left: 60px;
    padding: 45px 15%;
}
.store-edit-product-container-info-form-divBtn{
    display: flex;
    justify-content: end;
}

.card-adicionais{
    margin-top: 50px;
}
.card-adicionais-item{
    padding: 10px;
    margin: 20px 0;
}
.card-adicionais-item-title{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.card-adicionais-item-option{
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
}
.card-adicionais-item-option-price{
    color: green;
    font-weight: bold;
}
.card-adicionais-novo-divBtn{
    display: flex;
    justify-content: end;
}
.card-adicionais-item-newOption{
    padding-top: 15px;
}
</style>