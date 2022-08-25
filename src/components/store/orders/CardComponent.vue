<template>
    <v-skeleton-loader v-if="isLoadingData" type="list-item-avatar-two-line, list-item-three-line, actions"></v-skeleton-loader>
    <v-card class="mx-auto store-orders-card" width="318" v-else>
        <v-progress-linear v-if="order.status.id == 1 || order.status.id == 2 || order.status.id == 3" indeterminate :color="selectColor()"></v-progress-linear>
        <v-progress-linear v-else value="100" :color="selectColor()"></v-progress-linear>
        <v-card-text class="store-orders-card-container">
            <div class="text--primary" style="display: flex; justify-content: space-between">
                <div style="text-transform: uppercase; font-weight: bold; display: flex; align-items: center">{{ order.user.name }}</div>
                <div>
                    <router-link class="router-link" :to="{name: 'store-order-detail', params: {id: order.id}}">
                        <v-btn text color="light-blue darken-4" style="padding: 0 4px"><i class="fas fa-comment-alt-dots" style="margin: 0 5px"></i> Ver Pedido</v-btn>
                    </router-link>
                    
                </div>
            </div>
            <p>{{ order.street }}, {{ order.number }}, {{ order.district }}, {{ order.city }}</p>
            <div class="store-order-card-body">
                <div class="store-order-card-body-box">
                    <div>Pedido Realizado</div>
                    <div class="store-order-card-body-box-value">{{ order.sent | hourFormat }}</div>
                </div>
                <div class="store-order-card-body-box">
                    <div>Valor</div>
                    <div class="store-order-card-body-box-value"> <small>R$</small> {{ order.amount | moneyFormat }}</div>
                </div>
            </div>
        </v-card-text>
        <v-card-actions v-if="order.status.id == 1" style="justify-content: end">
            <v-btn text color="red darken-2" @click="rejectOrder()" >Rejeitar</v-btn>
            <v-btn text color="teal accent-4" @click="acceptOrder()">Aceitar</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="order.status.id == 2" style="justify-content: end">
            <v-btn text color="teal accent-4" @click="deliveryOrder()">Saiu para entrega</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="order.status.id == 3" style="justify-content: end">
            <v-btn text color="teal darken-1" @click="finishedOrder()">Pedido entregue</v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../../../lib/api'
import { format, formatISO } from 'date-fns'
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
        },
        async acceptOrder(){
            try{
                await axios.put(`${baseURL}/order/${this.order.id}`, {accepted: 1, status: 2, viewed: formatISO(new Date())}, this.req)
                this.$emit('orderUpdated')
            }catch(err){
                console.log(err)
            }
        },
        async deliveryOrder(){
            try{
                await axios.put(`${baseURL}/order/${this.order.id}`, { status: 3}, this.req)
                this.$emit('orderUpdated')
            }catch(err){
                console.log(err)
            }
        },
        async finishedOrder(){
            try{
                await axios.put(`${baseURL}/order/${this.order.id}`, { status: 4, conclusion: formatISO(new Date())}, this.req)
                this.$emit('orderUpdated')
            }catch(err){
                console.log(err)
            }
        },
        async rejectOrder(){
            try{
                await axios.put(`${baseURL}/order/${this.order.id}`, { status: 5}, this.req)
                this.$emit('orderUpdated')
            }catch(err){
                console.log(err)
            }
        },
        selectColor(){
            if(this.order.status.id == 1){
                return 'yellow darken-2'
            }
            else if(this.order.status.id == 2){
                return '#f0932b'
            }
            else if(this.order.status.id == 3){
                return '#2980b9'
            }
            else if(this.order.status.id == 4){
                return '#27ae60'
            }
            else{
                return 'red'
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