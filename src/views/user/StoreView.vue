<template>
    <div class="user-store">
        <nav-bar />
        <div class="user-store-container">
            <div class="user-store-container-header">
                <!-- Modal adicionar produto ao carrinho -->
                    <v-dialog v-model="dialog" max-width="600px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Adicionar ao carrinho</span>
                            </v-card-title>
                            <v-card-text>
                                <hr>
                                <div class="user-table-value JS-product-addToCard-product">
                                    <div class="user-table-title">{{this.modalInfo.productName}}</div> 
                                    <div class="user-table-subtitle">{{this.modalInfo.productDescription}}</div>
                                </div>
                                <hr>
                                <div class="form-group" id="radioGroupOptionAdditionals">
                                    <div v-if="modalInfo.additionals.length > 0">
                                        <div v-for="additional in modalInfo.additionals" :key="additional.id" class="JS-product-addToCard-additional">
                                            <div class="JS-product-addToCard-additional-title">{{additional.name}}</div>
                                            <div class="JS-product-addToCard-additional-body">
                                                <v-radio-group style="margin-top: 0" >
                                                    <div v-for="optionAdditional in additional.optionAdditionals" :key="optionAdditional.id" class="JS-product-addToCard-additional-body-item"> 
                                                        <div class="JS-product-addToCard-additional-body-item-name">
                                                            <v-radio @change="radioOptionIsClicked()" :label="optionAdditional.name" :value="optionAdditional.id"></v-radio>
                                                        </div>
                                                        <div class="JS-product-addToCard-additional-body-item-price">
                                                            + R$ {{optionAdditional.price}}
                                                        </div>  
                                                    </div>
                                                </v-radio-group>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                    <v-text-field label="Observação(opcional)" v-model="modalInfo.observation" outlined clearable></v-text-field>
                                </div>
                                <div class="JS-product-addToCard-amount">
                                    <div>Valor unitário: R$ <span class="JS-product-valorUnitario">{{this.modalInfo.unityProductPrice}}</span></div>
                                    <div class="JS-product-addToCard-amount-display">
                                        <div class="JS-product-addToCard-amount-display-counter">
                                            <div class="JS-product-addToCard-amount-display-counter-btn"> <button class="btnRemoveQuant" @click="removeQuant()" type="button" >-</button> </div>
                                            <input type="number" name="txtQuant" class="JS-product-addToCard-amount-display-counter-value" :value="modalInfo.quant" readonly="true"> 
                                            <div class="JS-product-addToCard-amount-display-counter-btn " > <button class="btnAddQuant" @click="addQuant()" type="button">+</button> </div>
                                        </div>
                                    </div>
                                    <div>Valor Total: R$ <span class="JS-product-valorTotal">{{this.modalInfo.amountValue}}</span></div>
                                </div>
                                
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="addToCart()">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                <div class="user-store-container-header-logo shadow-effect">
                    <img :src="this.store.image" alt="">
                </div>
                <div class="user-store-container-header-info shadow-effect">
                    <div class="user-store-container-header-info-title">{{this.store.name}}</div>
                    <v-row align="center" class="mx-0 row-stars">
                        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="grey--text ms-4">
                            4.5 (413)
                        </div>
                    </v-row>
                </div>
            </div>
            <div class="user-store-container-body shadow-effect">
                <template>
                    <v-card>
                        <v-tabs v-model="model" background-color="#11101d" center-active dark centered>
                            <v-tab v-for="category in categories" :key="category.id" :href="`#tab-${category.id}`">{{category.name}}</v-tab>
                        </v-tabs>
                    </v-card>
                </template>
                <v-tabs-items v-model="model">
                    <v-tab-item v-for="category in categories" :key="category.id" :value="`tab-${category.id}`">
                        <v-card style="padding: 35px 20px; background-color: #fdfdfd">
                            <table class="table table-borderless JS-product-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Preço</th>
                                    </tr>
                                </thead>
                                <tbody class="JS-product-table-tbody">
                                    <tr @click="modal(product.id)" v-for="product in category.products" :key="product.id" class="JS-product-table-tbody-tr">
                                        <td class="JS-product-table-tbody-td-left"> 
                                            <div class="user-table-value">
                                                <div class="user-table-title">{{product.name}}</div> 
                                                <div>{{product.description}}</div>
                                            </div>
                                        </td>
                                        <td class="JS-product-table-tbody-td-right ">
                                            <div class="user-table-price">R$ {{product.price}}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>
        <alert-component v-if="alert.isVisible" :message="alert.message" :status="alert.status" @closeAlert="alert.isVisible = false"/>
    </div>
</template>
<script>
import NavBar from '../../components/user/NavBar.vue'
import AlertComponent from '../../components/AlertComponent.vue'
import axios from 'axios';
import {baseURL} from '../../lib/api';

export default{
    data(){
        return{
            model: 'category',
            store: {},
            categories: [],
            dialog: false,
            token: localStorage.getItem('token'),
            modalInfo: {
                productId: '',
                productName: '',
                productPrice: '',
                unityProductPrice: '',
                productDescription: '',
                quant: 1,
                amountValue: '',
                observation: '',
                additionals: []
            },
            alert: {
                isVisible: false,
                message: '',
                status: 0
            }
        }
    },
    methods: {
        showAlert(message, statusCode){
            this.alert.message = message;
            this.alert.status = statusCode,
            this.alert.isVisible = true
            setTimeout(() => {
                this.alert.isVisible = false
            },5300)
        },
        async loadStore(){
            const id = this.$route.params.id;

            if(isNaN(id)){
                this.$router.push({name: 'user-home'});
            }

            var req = {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }

            const res = await axios.get(`${baseURL}/store/${this.$route.params.id}`, req);

            if(res.data){
                this.store = res.data
                const cat = await axios.get(`http://localhost:3000/category/store/${id}`, req);
                this.categories = cat.data;
            }
            else{
                this.$router.push({name: 'user-home'});
            }
        },
        async modal(id){
            try{
                const product = await axios.get(`http://localhost:3000/product/${id}`);
                this.modalInfo.productId = product.data.id;
                this.modalInfo.productName = product.data.name;
                this.modalInfo.productDescription = product.data.description;
                this.modalInfo.productPrice = product.data.price;
                this.modalInfo.unityProductPrice = product.data.price;
                this.modalInfo.amountValue = product.data.price;
                this.modalInfo.quant = 1;
                
                const additionals = await axios.get(`http://localhost:3000/additional/product/${id}`);
                this.modalInfo.additionals = additionals.data;
                this.dialog = true;
            }catch(err){
                console.log(err);
            }
            
        },
        addQuant(){
            this.modalInfo.quant < 10 && this.modalInfo.quant++;
            this.calcAmountValue();
        },
        removeQuant(){
            this.modalInfo.quant > 1 && this.modalInfo.quant--;
            this.calcAmountValue();
        },
        radioOptionIsClicked(){
            setTimeout(() => {
                this.calcAmountValue();
            }, 100);
            
        },
        async calcAmountValue(){
            // Salva na variável todos os inputs selecionados
            var inputsCheckeds = document.getElementById('radioGroupOptionAdditionals').querySelectorAll('input[type="radio"]:checked');
            var options = [];
            var additionalsValue = 0;
            
            // Percorre a array de inputs selecionados, salva os dados na array options em formato JSON e atribui o valor dos adicionais em "additionalsValue"
            for(const input of inputsCheckeds){
                const res = await axios.get(`http://localhost:3000/optionAdditional/${input.value}`);
                options.push({id: res.data.id, price: res.data.price});
                additionalsValue += Number(res.data.price);
            }

            // Salva os dados do Preço, dos Adicionais e a Quantidade nas variáveis
            const price = Number(this.modalInfo.productPrice);
            const additionalsPrice = additionalsValue;
            const quant = Number(this.modalInfo.quant);

            // Altera o valor total do modal
            this.modalInfo.unityProductPrice = (price + additionalsPrice).toFixed(2);
            this.modalInfo.amountValue = ((price + additionalsPrice) * quant).toFixed(2);
        },

        async addToCart(){
            // Salva na variável todos os inputs selecionados
            var inputsCheckeds = document.getElementById('radioGroupOptionAdditionals').querySelectorAll('input[type="radio"]:checked');
            var additionals = [];
            
            // Percorre a array de inputs selecionados, salva os dados na array options em formato JSON e atribui o valor dos adicionais em "additionalsValue"
            for(const input of inputsCheckeds){
                const res = await axios.get(`${baseURL}/optionAdditional/${input.value}`);
                additionals.push(
                    {
                        name: res.data.name,
                        price: res.data.price,
                        optionAdditional: {
                            id: res.data.id,
                        }
                    }
                );
            }

            var item = {
                product: {
                    id: this.modalInfo.productId
                },
                quantity: this.modalInfo.quant,
                unityPrice: this.modalInfo.unityProductPrice,
                amount: this.modalInfo.amountValue,
                observation: this.modalInfo.observation,
                additionals: additionals
            }

            this.modalInfo.observation.length < 1 && delete item.observation;

            try{
                var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
                
                const productsInCart = await axios.get(`${baseURL}/userProduct`, req);

                if(productsInCart.data.length > 0){
                    let storeId = this.store.id;
                    let id = productsInCart.data[0].product.category.store.id;

                    if(storeId != id){
                        let msgError = "Os produtos adicionados ao carrinho não podem ser de restaurantes distintos"
                        this.showAlert(msgError, 0)
                        throw new Error(msgError);
                    }
                }

                await axios.post(`${baseURL}/userProduct`, item, req);
                this.showAlert("Adicionado ao carrinho", 1)
                this.cleanModalInfo();
                this.dialog = false;
            }catch(err){
                console.log(err);
            }
        },
        cleanModalInfo(){
            this.modalInfo.productId = '',
            this.modalInfo.productName = '',
            this.modalInfo.productPrice = '',
            this.modalInfo.unityProductPrice = '',
            this.modalInfo.productDescription = '',
            this.modalInfo.quant = 1,
            this.modalInfo.amountValue = '',
            this.modalInfo.observation = '',
            this.modalInfo.additionals = []
        }
        
    },
    created: async function(){
        await this.loadStore();
    },
    components: {
        NavBar,
        AlertComponent
    }
}
</script>
<style scoped>

.shadow-effect{
    box-shadow: 0 0 4px 0 #e1e1e1;
}
.user-store{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.user-store-container{
    padding: 45px 15%;
    padding-left: calc(15% + 60px);
}
.user-store-container-header{
    display: flex;
    grid-gap: 14px;
}
.user-store-container-header-logo{
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.user-store-container-header-logo img{
    max-width: 100%;
    max-height: 100%;
}
.user-store-container-header-info{
    flex: 1;
    background-color: white;
    border-radius: 18px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.user-store-container-header-info-title{
    font-size: 24px;
    font-weight: bold;
}
.row-stars{
    padding: 15px 0;
}
.user-store-container-body{
    margin: 18px 0;
    border-radius: 6px;
    overflow: hidden;
}

/* Table */

.JS-product-table{
    border-collapse: unset;
    width: 100%;
}
.JS-product-table-tbody-tr{
    cursor: pointer;
}
.JS-product-table-tbody-tr:hover td{
    background-color: #e1e1e1;
}
.JS-product-table-tbody tr td{
    background-color: #ece9e9;
    padding: 10px;
}
.JS-product-table tr th{
    padding: 5px 12px;
    text-align: left;
}
.JS-product-table-tbody-td-left{
    border-radius: 10px 0 0 10px;
}
.JS-product-table-tbody-td-right{
    border-radius: 0 10px 10px 0;
}
.user-table-price{
    display: block;
    color: #B53471;
    font-weight: bold;
    font-size: 18px;
}
.user-table-title{
    color: #11101d;
    font-weight: bold;
    font-size: 19px;
}
.user-table-subtitle{
    font-size: 16px;
    color: #11101d;
}
.user-table-value{
    padding: 0 8px;
}

/* MODAL */

.JS-product-addToCard-product{
    border-radius: 10px;
    background-color: #e8e6e6;
    padding: 14px !important;
}
.JS-product-addToCard-additional-body{
    padding: 8px;
}
.JS-product-addToCard-additional-title{
    border-radius: 10px;
    background-color: #e8e6e6;
    padding: 10px;
    color: #11101d;
    font-size: 16px;
}
.JS-product-addToCard-additional-body-item{
    display: flex;
    justify-content: space-between;
}

.JS-product-addToCard-additional-body-item-price{
    color: green;
    font-weight: bold;
}
hr{
    margin: 1rem 0;
    color: inherit;
    background-color: currentColor;
    border: 0;
    opacity: .25;
    height: 1px;
}
.JS-product-addToCard-amount{
    text-align: center;
    color: #11101d;
    font-size: 16px;
}
.JS-product-addToCard-amount-display{
    display: flex;
    justify-content: center;
    align-items: center;
}
.JS-product-addToCard-amount-display-counter{
    display: flex;
}
.JS-product-addToCard-amount-display-counter-value{
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #11101d;
    color: white;
    margin: 0 8px;
    text-align: center;
    border: none;
}
.JS-product-addToCard-amount-display-counter-value::-webkit-inner-spin-button{
    all: unset;
}
.JS-product-addToCard-amount-display-counter-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
}
.JS-product-addToCard-amount-display-counter-btn button{
    border: none;
    background-color: #e1e1e1;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
