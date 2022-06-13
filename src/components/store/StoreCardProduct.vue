<template>
    <div  class=" JS-category-card">
        <div class="JS-category-dots">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        color="transparent"
                        v-bind="attrs"
                        v-on="on"
                        class="JS-category-card-dots-btn"
                    >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </v-btn>
            </template>
            <v-list>
                <router-link to="/login" class="nav-link">
                    <v-list-item class="nav-link-text">
                        <v-list-item-title class="navbar-link-option"><i class="fa-solid fa-pen-ruler"></i> Editar</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/register" class="nav-link">
                    <v-list-item class="nav-link-text">
                        <v-list-item-title class="navbar-link-option"><i class="fa-solid fa-trash-can"></i> Excluir</v-list-item-title>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-menu>
        </div>
        <div class="JS-category-card-body">
            <div class="JS-category-card-body-divIcon">
                <i :class="icon"></i>
            </div>
        </div>
        <div class="JS-category-card-title">
            <div class="JS-category-card-title-text"> <span> {{name}} </span> </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StoreCardProduct',
    data() {
        return {

        }
    },
    props: {
        id: Number,
        name: String,
        icon: String
    }
}
</script>

<style scoped>

.nav-link{
    text-decoration: none;
}
.nav-link-text:hover{
    background-color: #f2f2f2;
}

.JS-category-card{
    /*background-color: #f5f5f5;*/
    background-color: white;
    border-radius: 10px;
    width: 170px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    box-shadow:  0 0 4px 0 #e1e1e1;
    color: #2b2b2b;
    position: relative;
    cursor: pointer;
    padding: 5px;
}
.JS-category-card-new{
    border: dashed 2px #f5f5f5;
    border-radius: 10px;
    width: 170px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    color: #2b2b2b;
    display: flex;
    justify-content: center;
    align-items: center;
}
.JS-category-card-new-body-divIcon{
    height: 90px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}
.JS-category-card-new-body-divIcon i{
    font-size: 30px;
    z-index: 1;
    transition: .5s;
}
.JS-category-card-body{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.JS-category-card-title{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.JS-category-card-title-text{
    border-radius: 20px;
    background-color: #e8e6e6;
    padding: 8px 15px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.JS-category-card-title-text span{
    text-transform: uppercase;
    transition: .5s;
    z-index: 1;
    font-weight: 600;
    text-align: center;
}
.JS-category-card-title-text::before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: dodgerblue;
    transform: translate(-100%, -100%) rotate(-90deg);
    transition: .5s;
    z-index: 0;
}
.JS-category-card:hover .JS-category-card-title-text::before{
    transform: translate(0, 0);
    border-radius: 20px;
}
.JS-category-card:hover .JS-category-card-title-text span{
    color: white;
}
.JS-category-card-body-divIcon{
    height: 90px;
    width: 90px;
    background-color: #e8e6e6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}
.JS-category-card-body-divIcon i{
    font-size: 30px;
    z-index: 1;
    transition: .5s;
}
.JS-category-card-body-divIcon::before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: dodgerblue;
    transform: translate(-50%, -100%);
    transition: .5s;
    z-index: 0;
}
.JS-category-card:hover .JS-category-card-body-divIcon::before{
    transform: translate(0, 0) rotate(-90deg);
    border-radius: 50%;
}
.JS-category-card:hover .JS-category-card-body-divIcon i{
    color: white;
}
.JS-category-dots{
    display: flex; 
    justify-content: end;
}
.JS-category-card-dots-btn{
    padding: 0 !important;
    min-width: auto !important;
    height: 30px !important;
    width: 30px !important;
    border-radius: 50%;
    box-shadow: none !important;
}
</style>
