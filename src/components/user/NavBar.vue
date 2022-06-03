<template>
    <div>
        <v-app-bar class="user-navbar" color="transparent" dark style="z-index: 100; box-shadow: none" >
            <div class="d-flex align-center">
                <v-app-bar-nav-icon style="color: #11101d" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
        </v-app-bar>

        <!-- ------------------------------------- MENU RETRÁTIL -------------------------------------------------------- --> 

        <v-navigation-drawer
        v-model="drawer"
        fixed
        bottom
        style="padding-top: 70px"
        >
        <v-list nav dense >
            <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            >
                <router-link to="/">
                    <v-list-item class="px-5 py-4">
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/dashboard/products">
                    <v-list-item class="px-5 py-4">
                        <v-list-item-title>Meus Produtos</v-list-item-title>
                    </v-list-item>
                </router-link>
                
                <router-link to="/dashboard/favorites">
                    <v-list-item class="px-5 py-4">
                        <v-list-item-title>Favoritos</v-list-item-title>
                    </v-list-item>
                </router-link>

                <v-list-item class="px-5 py-4">
                    <v-list-item-title>Configurações</v-list-item-title>
                </v-list-item>

                <router-link to="/dashboard/info">
                    <v-list-item class="px-5 py-4">
                        <v-list-item-title>Meus Dados</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </div>
        
</template>

<script>

export default{
    name: 'UserNavbarComponent',
    data() {
        return {

            drawer: false,
            group: null,
        }
    }
}
</script>

<style>

</style>
