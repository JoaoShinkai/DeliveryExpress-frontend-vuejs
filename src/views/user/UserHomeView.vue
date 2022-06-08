<template>
    <div class="user-home">
        <div class="user-home-container">
            <div class="user-home-container-categories">
                <div>
                    <input id="1" class="user-home-container-categories-input" name="option-category" type="radio">
                    <label for="1" class="user-home-container-categories-item"><i class="fa-solid fa-burger"></i></label>
                </div>
                <div>
                    <input id="2" class="user-home-container-categories-input" name="option-category" type="radio">
                    <label for="2" class="user-home-container-categories-item"><i class="fa-solid fa-ice-cream"></i></label>
                </div>
                <div>
                    <input id="3" class="user-home-container-categories-input" name="option-category" type="radio">
                    <label for="3" class="user-home-container-categories-item"><i class="fa-solid fa-pizza-slice"></i></label>
                </div>
                <div>
                    <input id="4" class="user-home-container-categories-input" name="option-category" type="radio">
                    <label for="4" class="user-home-container-categories-item"><i class="fa-solid fa-apple-whole"></i></label>
                </div>
                
                
                
            </div>
            <div class="user-home-container-stores">
                <div v-for="(store) in stores" :key="store.id">
                    <card-store :id="store.id" :name="store.name" :delivery="store.delivery" :status="store.status" />
                </div>
                
                
            </div>
        </div>
    </div>
</template>

<script>

import CardStore from '../../components/user/CardStore.vue';
import axios from 'axios';

export default {
    data(){
        return{
            stores: [],
            token: localStorage.getItem('token')
        }
    },
    components: {
        CardStore
    },
    methods: {
        async loadStores(){
            var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
            const res = await axios.get('http://localhost:3000/store', req);
            this.stores = res.data;
        }
    },
    created: async function(){
        await this.loadStores();
    }
}
</script>

<style scoped>

.user-home{
    background-color: #f2f2f2;
    min-height: 100vh;
    padding: 30px 0;
}
.user-home-container{
    padding: 15px 15%;
}
.user-home-container-stores{
    display: flex;
    padding: 1rem;
    grid-gap: 14px;
}
.user-home-container-categories{
    display: flex;
    padding: 1rem;
    grid-gap: 10px;
}
.user-home-container-categories-item{
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
}
.user-home-container-categories-input:checked + .user-home-container-categories-item{
    background-color: #2b2b2b;
    color: white;
}
.user-home-container-categories input[type='radio']{
    display: none;
}
</style>
