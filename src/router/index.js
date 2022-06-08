import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
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
    path: '/store/:id',
    name: 'store',
    component: StoreView,
    beforeEnter: async(to, from, next) => {
      await validateSession()? next() : next('/login')
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
