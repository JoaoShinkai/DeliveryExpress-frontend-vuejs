<template>
    <div class="store-home">
        <store-navbar-component/>
        <div class="store-home-container">
            <div class="store-home-container-column-one">
                <div class="store-home-container-column-one-item">
                    <sale-of-products-component/>
                </div>
                <div class="store-home-container-column-one-item">
                    <monthly-profit-component />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import StoreNavbarComponent from '../../components/store/StoreNavBar.vue'
import SaleOfProductsComponent from '../../components/store/dashboard/SaleOfProductsComponet.vue'
import MonthlyProfitComponent from '../../components/store/dashboard/MonthlyProfitComponent.vue'

export default {
  data() {
    return {
      
        
    }
  },
    components: {
        StoreNavbarComponent,
        SaleOfProductsComponent,
        MonthlyProfitComponent
    }
}
</script>



<style>
.store-home{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-home-container{
    margin-left: 60px;
    padding: 45px 5%;
}
.store-home-container-column-one{
    height: 300px;
    position: relative;
    display: flex;
    grid-gap: 20px;
}
.store-home-container-column-one-item{
    height: 100%;
    position: relative;
    display: flex;
    flex: 1;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
