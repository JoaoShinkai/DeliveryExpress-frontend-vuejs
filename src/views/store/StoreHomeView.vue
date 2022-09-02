<template>
    <div class="store-home">
        <store-navbar-component/>
        <div class="store-home-container">
            <div class="store-home-container-salutation">Bem vindo, <b>{{ storeName }}</b></div>
            <div class="store-home-container-column-header">
                <div class="store-home-container-column-header-item">
                    <div class="chart-container-title"><i class="far fa-scroll"></i> Pedidos no mês</div>
                </div>
                <div class="store-home-container-column-header-item">
                    <div class="chart-container-title"><i class="far fa-user-plus"></i> Novos clientes</div>
                </div>
                <div class="store-home-container-column-header-item">
                    <div class="chart-container-title">Quantidade de vendas</div>
                </div>
                <div class="store-home-container-column-header-item">
                    <div class="chart-container-title">Produtos mais vendidos</div>
                </div>
            </div>
            <div class="store-home-container-column-one">
                <div class="store-home-container-column-one-group">
                    <div class="chart-container-title"><i class="far fa-shopping-basket"></i> Produtos mais vendidos</div>
                    <div class="store-home-container-column-one-item">
                        <sale-of-products-component/>
                    </div>
                </div>
                <div class="store-home-container-column-one-group">
                    <div class="chart-container-title"><i class="far fa-sack-dollar"></i> Faturamento dos últimos meses</div>
                    <div class="store-home-container-column-one-item">
                        <monthly-profit-component />
                    </div>
                </div>
            </div>
            <div class="store-home-container-column-two">
                <div class="chart-container-title"><i class="far fa-heart"></i> Clientes mais fiéis</div>
                <clients-table-component />
            </div>
            
        </div>
    </div>
</template>

<script>

import StoreNavbarComponent from '../../components/store/StoreNavBar.vue'
import SaleOfProductsComponent from '../../components/store/dashboard/SaleOfProductsComponet.vue'
import MonthlyProfitComponent from '../../components/store/dashboard/MonthlyProfitComponent.vue'
import ClientsTableComponent from '../../components/store/dashboard/ClientsTableComponent.vue'
import jwt_decode from 'jwt-decode'

export default {
    data() {
        return {
            storeName: null,
            token: localStorage.getItem('token')
        }
    },
    components: {
        StoreNavbarComponent,
        SaleOfProductsComponent,
        MonthlyProfitComponent,
        ClientsTableComponent
    },
    methods: {
        loadStoreName(){
            const {name} = jwt_decode(this.token);

            this.storeName = name;
        }
    },
    created: async function() {
        this.loadStoreName();
    }
}
</script>



<style>
.store-home{
    font-family: 'Poppins', sans-serif;
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-home-container{
    margin-left: 60px;
    padding: 45px 5%;
}
.store-home-container-salutation{
    color: #272456;
    font-size: 22px;
    margin-bottom: 25px;
}
.store-home-container-column-one{
    min-height: 400px;
    position: relative;
    display: flex;
    grid-gap: 20px;
    margin-bottom: 20px;
}
.store-home-container-column-one-group{
    flex: 1;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 #e1e1e1;
}
.chart-container-title{
    padding: 15px 30px;
    font-size: 20px;
    font-weight: 600;
    color: #272456;
}
.chart-container-title i {
    margin-right: 8px;
}
.store-home-container-column-one-item{
    flex: 1;
    position: relative;
    display: flex;
    /* box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%); */
}

.custom-hr{
    width: 90%;
    margin-left: 5%;
    border: none;
    height: 1px;
    background-color: #e1e1e1;
}

.store-home-container-column-header{
    display: flex;
    grid-gap: 20px;
    margin-bottom: 20px;
}
.store-home-container-column-header-item{
    flex: 1;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 #e1e1e1;
}

.store-home-container-column-two{
    border-radius: 15px;
    box-shadow: 0 0 10px 0 #e1e1e1;
    overflow: hidden;
    background-color: white;
}

</style>
