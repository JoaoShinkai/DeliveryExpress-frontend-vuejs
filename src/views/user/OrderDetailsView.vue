<template>
    <div class="user-order-detail">
        <nav-bar/>
        <div class="user-order-detail-container">
            <div class="user-order-detail-container-order">
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
                        <div class="user-order-detail-container-order-header-info-value"><i class="fad fa-eye"></i> {{ order.viewed != null ? (order.viewed | hourFormat) : '- -:- -' }}</div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/user/NavBar.vue'
import axios from 'axios'
import { baseURL } from '../../lib/api'
import { format } from 'date-fns'
export default {
    data(){
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
    methods: {
        async loadOrder(){
            const id = this.$route.params.id;

            try{
                const res = await axios.get(`${baseURL}/order/${id}`)

                if(res.data){
                    this.order = res.data
                }
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
        paymentMethodFilter: function(value){
            if(value == 1){
                return "Dinheiro"
            }
            else{
                return "Cartão"
            }
        }
    },
    components: {
        NavBar
    },
    created: async function(){
        this.loadOrder()
    }
}
</script>

<style>
.user-order-detail{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.user-order-detail-container{
    padding: 45px 15%;
    padding-left: calc(15% + 60px);
}
.user-order-detail-container-order{
    background-color: white;
    padding: 40px 15px;
    position: relative;
}
.user-order-detail-container-order::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 16px;
    background: linear-gradient(-135deg, #f2f2f2 8px, transparent 0%), linear-gradient(135deg, #f2f2f2 8px, transparent 0%);
    background-size: 16px;
}
.user-order-detail-container-order::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 16px;
    background: linear-gradient(-45deg, #f2f2f2 8px, transparent 0%), linear-gradient(45deg, #f2f2f2 8px, transparent 0%);
    background-size: 16px;
}
.user-order-detail-container-order-header{
    padding: 10px;
    display: flex;
    gap: 20px;
}
.user-order-detail-container-order-header-info{
    background-color: #f2f2f2;
    flex: 1;
    border-radius: 6px;
    padding: 0 16px 10px 16px;
}
/* .user-order-detail-container-order-header-address{
    flex: 1;
    background-color: #f2f2f2;
    border-radius: 6px;
} */
.user-order-detail-container-order-header-info-value{
    padding: 0px 10px;
}
.user-order-detail-container-order-header-info-value i{
    margin-right: 10px;
}
.chip-order-detail{
    
}
.user-order-detail-container-order-content{
    padding: 10px 0;
}
.user-order-detail-container-order-content-products{
    border-radius: 6px;
    padding: 0 16px 10px 16px;
}

.JS-order-card-body-item{
    padding: 8px 0;
}
.JS-order-card-body-product{
    display: flex;
    justify-content: space-between;
    padding: 5px;
}
.JS-order-card-body-product-quant b{
    margin-right: 10px;
}
.JS-order-card-body-addtionals{
    margin-left: 30px;
    padding: 5px 0;
    display: flex;
    gap: 5px;
}
.JS-order-card-body-observation-text{
    margin-left: 30px;
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 8px;
}
.JS-order-card-body-observation-text i{
    margin: 0 8px;
    color: #cfcfcf;
}
.JS-order-card-body-item-taxa{
    padding: 8px 0;
    display: flex;
    justify-content: end;
    font-size: 18px;
    color: green;
}
.JS-order-card-body-valorTotal{
    display: flex;
    justify-content: end;
    font-weight: bold;
    font-size: 18px;
}
</style>