<template>
    <div class="store-products">
        <store-navbar />
        <div class="store-products-container">
            <div class="store-products-container-header">
                <v-dialog v-model="dialog" max-width="480">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" v-bind="attrs" v-on="on" fab dark color="#EA2027">
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="text-h5" style="padding: 22px 24px">Nova categoria</v-card-title>
                        <v-card-text>
                            <form action="">
                                <v-text-field label="Nome" v-model="modalCreateCategory.name" outlined></v-text-field>
                                <div>
                                    <div class="JS-category-new-icon">
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon" name="txtIcon" value="fas fa-cocktail">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon"><i class="fas fa-cocktail"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon2" name="txtIcon" value="fas fa-drumstick-bite">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon2"><i class="fas fa-drumstick-bite"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon3" name="txtIcon" value="fas fa-glass-cheers">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon3"><i class="fas fa-glass-cheers"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon4" name="txtIcon" value="fas fa-hamburger">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon4"><i class="fas fa-hamburger"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon5" name="txtIcon" value="fas fa-pizza-slice">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon5"><i class="fas fa-pizza-slice"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon6" name="txtIcon" value="fas fa-utensils">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon6"><i class="fas fa-utensils"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon7" name="txtIcon" value="fas fa-ice-cream">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon7"><i class="fas fa-ice-cream"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon8" name="txtIcon" value="fas fa-hotdog">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon8"><i class="fas fa-hotdog"></i></label>
                                        </div>
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon9" name="txtIcon" value="fas fa-egg">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon9"><i class="fas fa-egg"></i></label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">
                                Fechar
                            </v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false, createCategory()">
                                Cadastrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div class="store-products-container-categories">
                <store-card-product v-for="category in categories" :key="category.id" :id="category.id" :name="category.name" :icon="category.icon" />
            </div>
            
        </div>
    </div>
</template>

<script>
import StoreNavbar from '../../components/store/StoreNavBar.vue'
import StoreCardProduct from '../../components/store/StoreCardProduct.vue'
import axios from 'axios';
export default {
    data() {
        return {
            dialog: false,
            token: localStorage.getItem('token'),
            categories: [],
            modalCreateCategory: {
                name: '',
                icon: ''
            }
        }
    },
    components: {
        StoreNavbar,
        StoreCardProduct
    },
    methods: {
        async loadCategories() {
            try{
                var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }

                const result = await axios.post(`http://localhost:3000/store/authenticate`,{}, req);

                if(result.data.id){
                    const categories = await axios.get(`http://localhost:3000/category/store/${result.data.id}`)
                    this.categories = categories.data;
                }
            }catch(err){
                console.log(err);
            }
        },
        async createCategory(){
            console.log(this.modalCreateCategory)
        }
    },
    created: async function(){
        await this.loadCategories();
        console.log(this.categories);
    }
}
</script>

<style scoped>
.store-products{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-products-container{
    margin-left: 60px;
    padding: 45px 15%;
    border: solid 2px red;
}
.store-products-container-categories{
    border: solid 2px blue;
    display: flex;
}
.store-products-container-header{
    border: solid 2px purple;
    padding: 8px 0;
    display: flex;
    justify-content: end;
}

.JS-category-new-icon{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.JS-category-new-icon-item{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 7px;
}
.JS-category-new-icon-item-label{
    background-color: #e1e1e1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.JS-category-new-icon-item input{
    display: none;
}
.JS-category-new-icon-item-radio:checked ~ .JS-category-new-icon-item-label{
    background-color: dodgerblue;
    color: white;
}


</style>
