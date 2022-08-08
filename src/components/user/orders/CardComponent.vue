<template>
    <v-sheet v-if="loadingData" color="transparent" class="pa-3">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else max-width="374">
        
        <v-card-title class="orders-card-title">
            <div>{{ order.store.name }}</div>
            <div class="orders-card-title-orderId"><b>#{{ order.id }}</b></div>
        </v-card-title>

        <v-card-text>
            
            <div :class="`order-card-status-${order.status}`">
                {{ order.status | resolveStatus }}
            </div>
            <div class="">
                <v-chip class="order-card-chip order-card-chip-modified chip-date">
                    <div class="order-card-chip-icon">
                        <i class="fal fa-calendar-alt"></i>
                    </div>
                    <div class="order-card-chip-text">{{ order.date | dateFormat }}</div>
                </v-chip>
                <v-chip class="order-card-chip order-card-chip-modified chip-date">
                    <div class="order-card-chip-icon">
                        <i class="fal fa-sack-dollar"></i>
                    </div>
                    <div class="order-card-chip-text">R$ {{ order.amount | moneyFormat }}</div>
                </v-chip>
            </div>

            <v-stepper style="box-shadow: none" alt-labels>
                <v-stepper-header>
                    <v-stepper-step :complete="order.sent != null" step="1">
                        Enviado
                        <small>{{order.sent | hourFormat}}</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="order.viewed != null" step="2">
                        Visualizado
                        <small>{{order.viewed != null ? (order.viewed | hourFormat) : '--:--'}}</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="order.conclusion != null" step="3">
                        Entregue
                        <small>{{order.conclusion != null ? (order.conclusion | hourFormat) : '--:--'}}</small>
                    </v-stepper-step>
                </v-stepper-header>
            </v-stepper>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions style="display: flex; justify-content: end">
            <router-link class="router-link" :to="{name: 'user-order-detail', params: {id: order.id}}">
                <v-btn color="deep-purple lighten-2" text>Detalhes</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../../../lib/api'
import { format } from 'date-fns'
export default {
    data(){
        return{
            loadingData: true,
            selection: 1,
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
        async loadOrder(){
            try{
                const res = await axios.get(`${baseURL}/order/${this.id}`, this.req)

                if(res.data){
                    this.order = res.data
                    this.loadingData = false
                }
                
            }catch(err){
                console.log(err)
            }
        }
    },
    filters: {
        resolveStatus(value) {
            if(value == 1){
                return "Pedido enviado ao restaurante"
            }
            else if(value == 2){
                return "Em preparo"
            }
            else if(value == 3){
                return "Saiu para entrega"
            }
            else if(value == 4){
                return "Pedido entregue"
            }
            else if(value == 5){
                return "Pedido rejeitado pelo restaurante"
            }
        },
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
        await this.loadOrder()
    }
}
</script>

<style>
.orders-card-title{
    display: flex;
    justify-content: space-between;
}
.order-card-status-1{
    font-size: 16px;
    color: orange;
}
.order-card-status-2{
    color: orangered;
    font-size: 16px;
}
.order-card-status-3{
    color: #1dd1a1;
    font-size: 16px;
}
.order-card-status-4{
    color: #05c46b;
    font-size: 16px;
}
.order-card-status-5{
    color: crimson;
    font-size: 16px;
}
.orders-card-title-orderId{
    background-color: #e74c3c;
    color: white;
    padding: 0 10px;
    border-radius: 15px 0 0 15px;
    position: relative;
}
.orders-card-title-orderId::before{
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 100%;
    background-color: #e74c3c;
    transform: translateX(100%);
}
.order-card-chip-modified{
    
    margin: 12px 12px 12px 0;
    color: #2b2b2b !important;
    padding: 0 3px !important;
}
.chip-date{
    background-color: #e9e9e9 !important;
}
.chip-price{
    background-color: #e9e9e9 !important;
}
.order-card-chip-icon{
    background-color: white;
    border-radius: 50%;
    height: 26px;
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order-card-chip-text{
    padding: 0 6px;
}
</style>