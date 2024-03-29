import { baseURL } from '@/lib/api'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import StoreEditProduct from '../views/store/StoreEditProduct.vue'
import StoreHomeView from '../views/store/StoreHomeView.vue'
import StoreLoginView from '../views/store/StoreLoginView.vue'
import StoreOrderDetails from '../views/store/StoreOrderDetails.vue'
import StoreOrdersView from '../views/store/StoreOrdersView.vue'
import StoreProductsView from '../views/store/StoreProductsView.vue'
import AddressView from '../views/user/AddressView.vue'
import CartView from '../views/user/CartView.vue'
import OrderDetailsView from '../views/user/OrderDetailsView'
import OrdersView from '../views/user/OrdersView.vue'
import StoreView from '../views/user/StoreView.vue'
import UserHomeView from '../views/user/UserHomeView.vue'

Vue.use(VueRouter)

async function validateSession(){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    
    try{
      await axios.post('http://localhost:3000/users/authenticate', {}, req);
    }catch(err){
      return false;
    }
    return true;
  }
  else{
    return false;
  }
}

async function validateStoreSession(){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    
    try{
      await axios.post('http://localhost:3000/store/authenticate', {}, req);
    }catch(err){
      return false;
    }
    return true;
  }
  else{
    return false;
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },

  // User Views

  {
    path: '/user-home',
    name: 'user-home',
    component: UserHomeView,
    beforeEnter: async (to,from, next) => {
      await validateSession()? next() : next('/login')
    }
  },
  {
    path: '/user/store/:id',
    name: 'store',
    component: StoreView,
    beforeEnter: async(to, from, next) => {
      await validateSession()? next() : next('/login')
    }
  },
  {
    path: '/user/cart',
    name: 'user-cart',
    component: CartView,
    beforeEnter: async(to, from, next) => {
      await validateSession()? next() : next('/login')
    }
  },
  {
    path: '/user/address',
    name: 'user-address',
    component: AddressView,
    beforeEnter: async(to, from, next) => {
      await validateSession()? next() : next('/login')
    }
  },
  {
    path: '/user/orders',
    name: 'user-orders',
    component: OrdersView,
    beforeEnter: async(to, from, next) => {
      await validateSession()? next() : next('/login')
    }
  },
  {
    path: '/user/order/:id',
    name: 'user-order-detail',
    component: OrderDetailsView,
    beforeEnter: async(to, from, next) => {
      await validateSession() == false && next('/login')

      const {id: userId} = jwt_decode(localStorage.getItem('token'));

      const orderId = to.params.id;

      try{
        const order = await axios.get(`${baseURL}/order/${orderId}`);

        if(order.data.userId != userId){
          next('/user/orders')
        }

        next()
      }catch(err){
        console.log(err)
        next('/user/orders')
      }
      
    }
  },

  //Store Views
  {
    path: '/store/login',
    name: 'store-login',
    component: StoreLoginView
  },
  {
    path: '/store/home',
    name: 'store-home',
    component: StoreHomeView,
    beforeEnter: async(to, from, next) => {
      await validateStoreSession() ? next() : next('/store/login')
    }
  },
  {
    path: '/store/products',
    name: 'store-products',
    component: StoreProductsView,
    beforeEnter: async(to, from, next) => {
      await validateStoreSession() ? next() : next('/store/login')
    }
  },
  {
    path: '/store/edit/product/:id',
    name: 'store-edit-product',
    component: StoreEditProduct,
    beforeEnter: async(to, from, next) => {
      //Verifica se o token é valido e verifica se o id do produto pertence a esse restaurante
      try{
          await validateStoreSession() == false && next('/store/login');
          
          const {id: storeId} = jwt_decode(localStorage.getItem('token'));

          const productId = to.params.id;
          const product = await axios.get(`http://localhost:3000/product/${productId}`);

          const category = await axios.get(`http://localhost:3000/category/${product.data.categoryId}`);

          if(category.data.storeId != storeId){
              next('/store/products')
          }
          next();
      }catch(err){
          console.log(err);
          next('/store/products')
      }
    }
  },
  {
    path: '/store/orders',
    name: 'store-orders',
    component: StoreOrdersView,
    beforeEnter: async(to, from, next) => {
      await validateStoreSession() ? next() : next('/store/login')
    }
  },
  {
    path: '/store/order/:id',
    name: 'store-order-detail',
    component: StoreOrderDetails,
    beforeEnter: async(to, from, next) => {
      await validateStoreSession() == false && next("/store/login")

      const decodedToken = jwt_decode(localStorage.getItem('token'));
      const orderId = to.params.id;

      const order = await axios.get(`${baseURL}/order/${orderId}`);

      if(order.data.store.id != decodedToken.id){
        next("/store/orders")
      }

      next();
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
