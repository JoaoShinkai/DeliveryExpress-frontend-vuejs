<template>
    <div class="store-orders">
        <store-navbar-component />
        <div class="store-orders-container">
            <div class="store-orders-container-group">
                <div class="store-orders-container-group-title"> 
                    <div class="store-orders-container-group-title-text">Aguardando aprovação</div> 
                    <v-divider></v-divider> 
                </div>
                <card-component v-for="order in ordersSent" :key="order.id" :id="order.id" />
            </div>
            <div class="store-orders-container-group">
                <div class="store-orders-container-group-title"> 
                    <div class="store-orders-container-group-title-text">Em preparo</div> 
                    <v-divider></v-divider> 
                </div>
                <card-component v-for="order in ordersPrepare" :key="order.id" :id="order.id" />
            </div>
            <div class="store-orders-container-group">
                <div class="store-orders-container-group-title"> 
                    <div class="store-orders-container-group-title-text">Em entrega</div> 
                    <v-divider></v-divider> 
                </div>
                <card-component v-for="order in ordersDelivery" :key="order.id" :id="order.id" />
            </div>
            <div class="store-orders-container-group">
                <div class="store-orders-container-group-title"> 
                    <div class="store-orders-container-group-title-text">Finalizado</div> 
                    <v-divider></v-divider> 
                </div>
                <card-component v-for="order in ordersFinished" :key="order.id" :id="order.id" />
            </div>
            <div class="store-orders-container-group">
                <div class="store-orders-container-group-title"> 
                    <div class="store-orders-container-group-title-text">Rejeitado</div> 
                    <v-divider></v-divider> 
                </div>
                <card-component v-for="order in ordersRejected" :key="order.id" :id="order.id" />
            </div>
            
        </div>
    </div>
</template>

<script>
import StoreNavbarComponent from '../../components/store/StoreNavBar.vue'
import CardComponent from '../../components/store/orders/CardComponent.vue'
import axios from 'axios';
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
            ordersSent: [],
            ordersPrepare: [],
            ordersDelivery: [],
            ordersFinished: [],
            ordersRejected: [],
        }
    },
    comments: {
        CardComponent
    },
    components: {
        StoreNavbarComponent,
        CardComponent
    },
    methods: {
        async loadOrders() {
            try{
                const resultSent = await axios.get(`${baseURL}/order/status/1`, this.req);
                const resultPrepare = await axios.get(`${baseURL}/order/status/2`, this.req);
                const resultDelivery = await axios.get(`${baseURL}/order/status/3`, this.req);
                const resultFinished = await axios.get(`${baseURL}/order/status/4`, this.req);
                const resultRejected = await axios.get(`${baseURL}/order/status/5`, this.req);

                this.ordersSent = resultSent.data;
                this.ordersPrepare = resultPrepare.data;
                this.ordersDelivery = resultDelivery.data;
                this.ordersFinished = resultFinished.data;
                this.ordersRejected = resultRejected.data;
            }catch(err){
                console.log(err)
            }
        }
    },
    created: async function(){
        this.loadOrders()
    }
}
</script>

<style>
.store-orders{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-orders-container{
    margin-left: 60px;
    padding: 45px 10%;
    padding-left: calc(10% + 60px);
}

.store-orders-container-group{
    display: grid;
    grid-template-columns: repeat(auto-fill, 318px);
    justify-content: center;
    grid-gap: 15px;
    padding: 10px 0;
}
.store-orders-container-group-title{
    grid-column-start: 1;
    grid-column-end: -1;
    display: flex;
    align-items: center;
}
.store-orders-container-group-title-text{
    padding-right: 10px;
}
</style>