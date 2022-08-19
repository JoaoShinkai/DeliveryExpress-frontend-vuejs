<template>
    <v-skeleton-loader v-if="isLoadingData" type="list-item-avatar-two-line, list-item-three-line, actions"></v-skeleton-loader>
    <v-card class="mx-auto store-orders-card" width="318" v-else>
        <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
        <v-card-text class="store-orders-card-container">
            <div class="text--primary" style="text-transform: uppercase; font-weight: bold">
                {{ order.user.name }}
            </div>
            <p>{{ order.street }}, {{ order.number }}, {{ order.district }}, {{ order.city }}</p>
            <div class="store-order-card-body">
                <div class="store-order-card-body-box">
                    <div>Pedido Realizado</div>
                    <div class="store-order-card-body-box-value">{{ order.sent | hourFormat }}</div>
                </div>
                <div class="store-order-card-body-box">
                    <div>Valor</div>
                    <div class="store-order-card-body-box-value">{{ order.amount | moneyFormat }}</div>
                </div>
            </div>
        </v-card-text>
        <v-card-actions style="justify-content: end">
            <v-btn text color="red darken-2" >Rejeitar</v-btn>
            <v-btn text color="teal accent-4" >Aceitar</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../../../lib/api'
import { format } from 'date-fns'
export default {
    data() {
        return{
            isLoadingData: true,
            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            order: {}
        }
    },
    props: {
        id: Number
    },
    methods: {
        async loadOrder() {
            try{
                const order = await axios.get(`${baseURL}/order/${this.id}`, this.req);

                this.order = order.data;
                this.isLoadingData = false;
            }catch(err){
                console.log(err)
            }
        }
    },
    filters: {
        hourFormat(date) {
            return format(Date.parse(date), 'HH:mm')
        },
        dateFormat(date) {
            return format(Date.parse(date), 'dd/MM/yyyy')
        },
        moneyFormat(value){
            return parseFloat(value).toFixed(2).replace(".",",")
        },
    },
    created: async function(){
        this.loadOrder();
    }
}
</script>

<style>
.store-order-card-body{
    display: flex;
    align-items: center;
}
.store-order-card-body-box{
    padding: 5px;
    flex: 1;
    text-align: center;
}
.store-order-card-body-box-value{
    font-weight: bold;
    font-size: 24px;
    color: #2b2b2b;
    padding: 4px;
}
.store-orders-card{
    display: flex;
    flex-direction: column;
}
.store-orders-card-container{
    flex: 1;
}
</style>