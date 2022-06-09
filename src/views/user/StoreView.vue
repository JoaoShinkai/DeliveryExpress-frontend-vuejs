<template>
    <div class="user-store">
        <nav-bar />
        <div class="user-store-container">
            <div class="user-store-container-header">
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn id="teste" style="display: none" color="primary" dark v-bind="attrs" v-on="on">
                                Open Dialog
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{this.modalInfo.productName}}</span>
                            </v-card-title>
                            <v-card-text>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
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
    </div>
</template>
<script>
// import ModalAddToCart from '../../components/user/ModalAddToCart.vue'
import NavBar from '../../components/user/NavBar.vue'
import axios from 'axios';

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
                productName: ''
            }
        }
    },
    methods: {
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

            const res = await axios.get(`http://localhost:3000/store/${this.$route.params.id}`, req);

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
                this.dialog = true;
            }catch(err){
                console.log(err);
            }
            
        }
    },
    created: async function(){
        await this.loadStore();
        console.log(this.categories);
    },
    components: {
        NavBar
        // ModalAddToCart
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
    font-size: 18px;
}
.user-table-value{
    padding: 0 8px;
}
</style>
