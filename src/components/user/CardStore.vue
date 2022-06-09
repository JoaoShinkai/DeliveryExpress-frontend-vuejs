<template>
    <router-link :to="{name: 'store', params: {id: this.id}}" style="text-decoration: none; color: #2b2b2b">
        <div class="store-card">
            <div class="store-card-logo">
                <img :src="image" alt="">
            </div>
            <div class="store-card-body">
                <div class="store-card-body-title">{{ name }}</div>
                <div class="store-card-body-info">
                    <div v-if="status == 1"><i class="fa-solid fa-signs-post"></i>Aberto</div>
                    <div v-else><i class="fa-solid fa-signs-post"></i>Fechado</div>
                    <div><i class="fa-solid fa-truck"></i>{{ delivery }}</div>
                </div>
                
            </div>
        </div>
    </router-link>
</template>

<script>


export default {
    data(){
        return {
            
        }
    },
    props: {
        id: Number,
        image: String,
        name: String,
        delivery: String,
        status: Number
    }
}
</script>

<style scoped>
.store-card{
    min-height: 200px;
    width: 190px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 1px 0 lightgrey;
    padding: 10px;
    box-shadow: 0 0 4px 0 #e1e1e1;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.store-card-logo{
    height: 170px;
    border-radius: 50%;
    overflow: hidden;
}
.store-card-logo img{
    max-height: 100%;
    max-width: 100%;
}
.store-card-body{
    padding: 10px 0;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.store-card-body-title{
    font-weight: bold;
    padding: 4px 0;
    flex: 1;
    text-align: center;
}
.store-card-body-info{
    display: flex;
    justify-content: space-between;
    padding: 4px 0;

}
</style>
