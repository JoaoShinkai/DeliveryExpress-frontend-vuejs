<template>
    <div class="store-home">
        <store-navbar-component/>
        <div class="store-home-container">
            Store home
        </div>
    </div>
</template>

<script>

import StoreNavbarComponent from '../../components/store/StoreNavBar.vue'

export default {
    data() {
        return{

        }
    },
    components: {
        StoreNavbarComponent
    }
}
</script>

<style scoped>
.store-home{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-home-container{
    margin-left: 60px;
    padding: 45px 15%;
    border: solid 2px red;
}
</style>
