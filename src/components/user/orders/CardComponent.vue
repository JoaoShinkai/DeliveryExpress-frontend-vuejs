<template>
    <v-sheet v-if="loadingData" color="transparent" class="pa-3">
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else max-width="374">
        
        <v-card-title class="orders-card-title">
            <div>{{ order.store.name }}</div>
            <div><b>#{{ order.id }}</b></div>
        </v-card-title>

        <v-card-text>
            <div :class="`order-card-status-${order.status}`">
                {{ order.status | resolveStatus }}
            </div>

            <v-stepper style="box-shadow: none" alt-labels>
                <v-stepper-header>
                    <v-stepper-step :complete="order.sent != null" step="1">
                        Enviado
                        <small>{{order.sent | dateFormat}}</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="order.viewed != null" step="2">
                        Visualizado
                        <small>{{order.viewed != null ? (order.viewed | dateFormat) : '--:--'}}</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="order.conclusion != null" step="3">
                        Entregue
                        <small>{{order.conclusion != null ? (order.conclusion | dateFormat) : '--:--'}}</small>
                    </v-stepper-step>
                </v-stepper-header>
            </v-stepper>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <!-- <v-card-title>Tonight's availability</v-card-title>

        <v-card-text>
            <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
        </v-card-text> -->

        <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>Detalhes</v-btn>
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
        dateFormat(date) {
            return format(Date.parse(date), 'HH:mm')
        }
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
</style>