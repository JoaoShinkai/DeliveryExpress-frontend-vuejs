<template>
    <div>
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
                        <router-link to="/store/home" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-home"></i></div>
                            <div class="dashboard-nav-text navHidden"> Início </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/store/products" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-book-open"></i></div>
                            <div class="dashboard-nav-text navHidden">Produtos</div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/store/orders" class="router-link">
                            <div class="dashboard-nav-icon"><i class="fas fa-scroll-old"></i></div>
                            <div class="dashboard-nav-text navHidden">Pedidos</div>
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
    name: 'StoreNavbarComponent',
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
            this.$router.push({name: 'store-login'});
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
