<template>
    <div class="store-order-details">
        <nav-bar />
        <div class="store-order-details-container">
            <div class="user-order-detail-container-order" v-if="order.id">
                
                <div class="user-order-detail-container-order-header">
                    <div class="user-order-detail-container-order-header-info">
                        <v-chip class="order-card-chip order-card-chip-modified chip-order-detail">
                            <div class="order-card-chip-icon">
                                <i class="fal fa-calendar-alt"></i>
                            </div>
                            <div class="order-card-chip-text">Informações</div>
                        </v-chip>
                        <div class="user-order-detail-container-order-header-info-value"><i class="fad fa-calendar"></i> {{ order.date | dateFormat }}</div>
                        <div class="user-order-detail-container-order-header-info-value"><i class="fad fa-paper-plane"></i> {{ order.sent | hourFormat }}</div>
                        <div class="user-order-detail-container-order-header-info-value"><i class="fad fa-eye"></i> {{ order.viewed != null ? order.viewed : '- -:- -' | hourFormat}}</div>
                        <div class="user-order-detail-container-order-header-info-value"><i class="fas fa-flag-checkered"></i> {{ order.conclusion != null ? (order.conclusion | hourFormat) : '- -:- -' }}</div>
                    </div>
                    <div class="user-order-detail-container-order-header-info">
                        <v-chip class="order-card-chip order-card-chip-modified chip-order-detail">
                            <div class="order-card-chip-icon">
                                <i class="fal fa-map-marker-alt"></i>
                            </div>
                            <div class="order-card-chip-text">Endereço</div>
                        </v-chip>
                        <div class="user-order-detail-container-order-header-info-value">{{ order.street}}, {{ order.number }}, {{ order.district }}, {{ order.city }} - {{ order.uf }}</div>
                        <v-chip class="order-card-chip order-card-chip-modified chip-order-detail">
                            <div class="order-card-chip-icon">
                                <i class="fal fa-credit-card"></i>
                            </div>
                            <div class="order-card-chip-text">Método de Pagamento</div>
                        </v-chip>
                        <div class="user-order-detail-container-order-header-info-value">{{ order.paymentMethod | paymentMethodFilter }}</div>
                    </div>
                </div>
                <div class="user-order-detail-container-order-content">
                    <div class="user-order-detail-container-order-content-products">
                        <div v-for="product in order.products" :key="product.id" class="JS-order-card-body-item">
                            <div class="JS-order-card-body-product">
                                <div class="JS-order-card-body-product-quant"><b>{{ product.quantity }}x</b> {{ product.product.name }}</div>
                                <div>R$ {{ product.amount | moneyFormat }}</div>
                            </div>
                            
                            <div class="JS-order-card-body-addtionals">
                                <v-chip v-for="additional in product.additionals" :key="additional.id" class="order-card-chip" style="margin: 0" color="#f5f5f5">
                                    {{ additional.name }}
                                </v-chip>
                            </div>
                            <div class="JS-order-card-body-observation">
                                <div class="JS-order-card-body-observation-text"><i class="fas fa-comment-alt-edit"></i> {{ product.observation }} </div>
                            </div>
                        </div>
                        <div class="JS-order-card-body-item-taxa">
                            <div class="JS-order-card-body-item-taxa-valor">+ R$ {{ order.delivery | moneyFormat }}</div>
                        </div>
                        <div class="JS-order-card-body-item">
                            <div class="JS-order-card-body-valorTotal">R$ {{ order.amount | moneyFormat }}</div>
                        </div>
                        <div class="JS-order-card-body-footer">
                            <div class="JS-order-card-body-footer-group">
                                <div class="JS-order-card-body-footer-group-item">
                                    <div class="JS-order-card-body-footer-group-item-title"><i class="fa-solid fa-user"></i> Cliente</div>
                                    <div class="JS-order-card-body-footer-group-item-value"> {{ order.user.name }} </div>
                                </div>
                            </div>
                            <div class="JS-order-card-body-footer-group">
                                <div class="JS-order-card-body-footer-group-item">
                                    <div class="JS-order-card-body-footer-group-item-title"><i class="fa-solid fa-coins"></i> Troco para:</div>
                                    <div class="JS-order-card-body-footer-group-item-value" style="color: #AD1457"> <small>R$</small> {{ order.changeMoney | moneyFormat }} </div>
                                </div>
                                <div class="JS-order-card-body-footer-group-item">
                                    <div class="JS-order-card-body-footer-group-item-title"><i class="fa-solid fa-cash-register"></i> Troco:</div>
                                    <div class="JS-order-card-body-footer-group-item-value"> <small>R$</small> {{ this.calcTroco(order.changeMoney, order.amount) | moneyFormat }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/store/StoreNavBar.vue'
import axios from 'axios'
import {baseURL} from '../../lib/api'
import {format} from 'date-fns'
export default {
    data() {
        return{
            token: localStorage.getItem('token'),
            req: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            order: {}
        }
    },
    components: {
        NavBar
    },
    methods: {
        async loadOrder(){
            try{
                const orderId = this.$route.params.id;
                const res = await axios.get(`${baseURL}/order/${orderId}`);

                this.order = res.data;
            }catch(err){
                console.log(err)
            }
        },
        calcTroco(troco, value){
            return parseFloat(troco) - parseFloat(value);
        }
    }, 
    filters: {
        hourFormat(date) {
            return date != '- -:- -' && format(Date.parse(date), 'HH:mm')
        },  
        dateFormat(date) {
            return date != '- -:- -' && format(Date.parse(date), 'dd/MM/yyyy')
        },
        moneyFormat(value){
            return parseFloat(value).toFixed(2).replace(".",",")
        },
        paymentMethodFilter: function(value){
            if(value == 1){
                return "Dinheiro"
            }
            else{
                return "Cartão"
            }
        }
    },
    created: async function(){
        await this.loadOrder();
    }
}
</script>

<style>
.store-order-details{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-order-details-container{
    margin-left: 60px;
    padding: 45px 10%;
    padding-left: calc(10% + 60px);
}
.JS-order-card-body-footer{
    display: flex;
    grid-gap: 20px;
}
.JS-order-card-body-footer-group{
    width: 50%;
    height: 100px;
    display: flex;
    grid-gap: 20px;
}
.JS-order-card-body-footer-group-item{
    flex: 1;
    background-color: #f2f2f2;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 8px;
}
.JS-order-card-body-footer-group-item-title{
}
.JS-order-card-body-footer-group-item-value{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: bold;
}
</style>