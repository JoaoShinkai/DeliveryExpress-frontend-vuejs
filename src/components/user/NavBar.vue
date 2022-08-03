<template>
    <div>
        <!-- <v-app-bar class="user-navbar" color="transparent" dark style="z-index: 100; box-shadow: none" >
            <div class="d-flex align-center">
                <v-app-bar-nav-icon v-if="active" style="color: white" @click.stop="active = !active"></v-app-bar-nav-icon>
                <v-app-bar-nav-icon v-else style="color: #11101d" @click.stop="active = !active"></v-app-bar-nav-icon>
            </div>
        </v-app-bar> -->

        <!-- ------------------------------------- MENU RETRÁTIL -------------------------------------------------------- --> 

        <!-- <v-navigation-drawer
        v-model="drawer"
        fixed
        bottom
        style="padding-top: 70px"
        class="user-navbar-drawer"
        >
        <v-list nav dense >
            <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            >
                <router-link to="/user-home" class="router-link">
                    <v-list-item class="px-5 py-4 item-nav">
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/dashboard/products" class="router-link">
                    <v-list-item class="px-5 py-4 item-nav">
                        <v-list-item-title>Meus Produtos</v-list-item-title>
                    </v-list-item>
                </router-link>
                
                <router-link to="/dashboard/favorites" class="router-link">
                    <v-list-item class="px-5 py-4 item-nav">
                        <v-list-item-title>Favoritos</v-list-item-title>
                    </v-list-item>
                </router-link>

                <v-list-item class="px-5 py-4 item-nav">
                    <v-list-item-title>Configurações</v-list-item-title>
                </v-list-item>

                <router-link to="/dashboard/info" class="router-link">
                    <v-list-item class="px-5 py-4 item-nav">
                        <v-list-item-title>Meus Dados</v-list-item-title>
                    </v-list-item>
                </router-link>
                <v-list-item class="px-5 py-4 item-nav">
                    <v-list-item-title @click="logout()">Logout</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer> -->

        <nav class="dashboard-nav"
            :class="{active}"
        >
            <ul>
                <div>
                    <li>
                        <div class="dashboard-nav-icon dashboard-bars" @click.stop="active = !active">
                            <i class="fa-solid fa-bars"></i>
                        </div>   
                    </li>
                    <li>
                        <router-link to="/user-home" class="dashboard-nav-title router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-home"></i></div>
                            <div class="dashboard-nav-text navHidden" style="display: flex; justify-content: center;"> </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="teste" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-book-open"></i></div>
                            <div class="dashboard-nav-text navHidden">Cardápio</div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/cart" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-shopping-cart"></i></div>
                            <div class="dashboard-nav-text navHidden">
                                Carrinho
                            </div>
                            <div class="user-dashboard-cart-cont">0</div>
                        </router-link>
                    </li>
                    <li>
                        <a href="#" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-cogs"></i></div>
                            <div class="dashboard-nav-text navHidden">Configurações</div>
                        </a>
                    </li>
                    <li>
                        <router-link to="/user/orders" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-scroll"></i></div>
                            <div class="dashboard-nav-text navHidden">Meus pedidos</div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/address" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div class="dashboard-nav-text navHidden">Endereços</div>
                        </router-link>
                    </li>
                </div>
                <div class="dashboard-nav-divLogout">
                    <div class="navHidden dashboard-nav-divLogout-div">
                        <div class="dashboard-nav-divLogout-img"></div>
                        <div class="dashboard-nav-divLogout-text">
                            <div class="dashboard-nav-divLogout-text-title">João Shinkai</div>
                            <div class="dashboard-nav-divLogout-text-subtitle">FullStack</div>
                        </div>
                    </div>
                    
                    <div @click="logout()" class="dashboard-nav-divLogout-button"><i class="fas fa-sign-out-alt"></i></div>
                </div>
                
            </ul>
        </nav>
    </div>
        
</template>

<script>

export default{
    name: 'UserNavbarComponent',
    data() {
        return {

            drawer: false,
            group: null,
            active: false
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style>
.user-navbar-drawer{
    background-color: #11101d !important;
}
.item-nav{
    color: white !important;
}
.router-link{
    text-decoration: none;
}

.dashboard-nav{
    position: fixed;
    height: 100vh;
    width: 60px;
    background-color: #11101d;
    transition: .3s;
    z-index: 10;
}
.dashboard-nav-title{
    display: flex;
    flex-direction: row-reverse;
}
.dashboard-nav ul{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 0;
    list-style: none;
}
.dashboard-nav ul{
    padding: 0 !important;
}
.dashboard-nav ul li{
    padding: 5px;
}
.dashboard-nav ul li a{
    display: flex;
    color: #e8e6e6;
    border-radius: 6px;
    font-weight: 500;
    position: relative;
}
.dashboard-bars{
    color: white;
    border-radius: 50%;
}
.dashboard-bars:hover{
    background-color: #1e1d31;
}
.dashboard-nav-icon{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.dashboard-nav ul li a:hover{
    background-color: white;
    color: #11101d;
}
.dashboard-nav-text{
    width: 0;
    display: flex;
    padding: 0px;
    align-items: center;
    transition: .5s;
    overflow: hidden;
    position: relative;
}
.dashboard-nav-text-logo{
    height: 40px;
}
.dashboard-nav-divLogout{
    background-color: #1d1b31;;
    margin: 5px;
    color: white;
    border-radius: 6px;
    height: 50px;
    display: flex;
    overflow: hidden;
    transition: .5s;
}
.dashboard-nav-divLogout-img{
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 6px;
}
.dashboard-nav-divLogout-button a{
}
.dashboard-nav-divLogout-button{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    color: white;
    margin: 0;
}

.dashboard-nav-divLogout-div{
    display: flex;
}
.dashboard-nav-divLogout-text{
    width: calc(240px - 10px - 100px);
    padding: 2px 10px;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
}
.dashboard-nav-divLogout-text-title{
    font-size: 17px;
}
.dashboard-nav-divLogout-text-subtitle{
    font-size: 15px;
}
.navHidden{
    width: 0;
    overflow: hidden;
    transition: .5s;
}
.user-dashboard-cart-cont{
    width: 12px;
    height: 12px;
    position: absolute;
    background-color: crimson;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 8px;
    bottom: 8px;
    border-radius: 50%;
    font-size: 10px;
}
.active{
    width: 250px;
}
.active .navHidden{
    width: calc(100% - 50px);
    padding: 5px;
}
.active .dashboard-nav-divLogout{
    height: 60px;
}
</style>
