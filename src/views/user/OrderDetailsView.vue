<template>
    <div class="user-order-detail">
        <nav-bar/>
        <div class="user-order-detail-container">
            Order Details
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/user/NavBar.vue'
export default {
    data(){
        return{

        }
    },
    components: {
        NavBar
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
</style>