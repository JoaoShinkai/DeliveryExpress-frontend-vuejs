<template>
    <div class="user-orders">
        <nav-bar/>
        
        <div class="user-orders-container">
            <div class="user-orders-container-group">
                <div class="user-orders-container-title">
                    <div class="user-orders-container-title-text">Últimos pedidos ({{orders.length}})</div>
                    
                    <v-divider></v-divider>
                </div>
                <card-component v-for="order in orders" :key="order.id" :id="order.id" />
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/user/NavBar.vue'
import CardComponent from '../../components/user/orders/CardComponent.vue'
import axios from 'axios'
import {baseURL} from '../../lib/api'
export default {
    data() {
        return{
            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            orders: []
        }
    },
    components: {
        NavBar,
        CardComponent
    },
    methods: {
        async loadOrders() {
            try{
                
                
                const result = await axios.get(`${baseURL}/order`, this.req)

                if(result.data){
                    this.orders = result.data
                }
            }catch(err){
                console.log(err)
            }
        }
    },
    created: async function(){
        await this.loadOrders();
    }
}
</script>

<style>
.user-orders{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.user-orders-container{
    padding: 45px 5%;
    padding-left: calc(5% + 60px);
}
.user-orders-container-group{
    display: grid;
    grid-template-columns: repeat(auto-fill, 374px);
    justify-content: center;
    grid-gap: 15px;
}
.user-orders-container-title{
    grid-column-start: 1;
    grid-column-end: -1;
    display: flex;
    align-items: center;
    color: gray;
}
.user-orders-container-title-text{
    padding: 0 10px;
}
</style>