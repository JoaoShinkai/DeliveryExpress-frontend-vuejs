<template>
    <div class="user-home">
        <user-navbar-component />
    </div>
</template>

<script>

import UserNavbarComponent from '../../components/user/NavBar.vue';

export default {
    data(){
        return{

        }
    },
    components: {
        UserNavbarComponent
    }
}
</script>

<style scoped>
.user-home{
    background-color: #dfe4ea;
    min-height: 100vh;
}
</style>
