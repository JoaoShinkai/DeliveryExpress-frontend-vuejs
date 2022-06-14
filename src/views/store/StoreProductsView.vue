<template>
    <div class="store-products">
        <store-navbar />
        <div class="store-products-container">
            <div class="store-products-container-header">
                <!-- Modal de criação de categoria -->
                <v-dialog v-model="dialog" max-width="480">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" v-bind="attrs" v-on="on" fab dark color="error">
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
                                        <div class="JS-category-new-icon-item">
                                            <input class="JS-category-new-icon-item-radio" v-model="modalCreateCategory.icon" type="radio" id="txtIcon10" name="txtIcon" value="fa-solid fa-bowl-food">
                                            <label class="JS-category-new-icon-item-label" for="txtIcon10"><i class="fa-solid fa-bowl-food"></i></label>
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
                            <v-btn color="green darken-1" text @click="createCategory()">
                                Cadastrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                
            </div>
            <div class="store-products-container-categories">
                <store-card-product v-for="category in categories" :key="category.id" :id="category.id" :name="category.name" :icon="category.icon"  @emitCategory="loadProducts" />
            </div>
            <hr>
            <div v-if="this.dataTable.categorySelected" class="store-products-container-products">
                <div class="store-products-container-products-header">
                    <modal-create-product :categoryId="dataTable.categorySelected" :categoryName="dataTable.categoryName" @productRegistered="loadProducts" />
                </div>
                <br>
                <v-card>
                    <v-card-title>
                        <v-chip class="ma-2 px-6 py-5" color="#11101d" text-color="white" style="font-size: 22px; border-radius: 20px">
                        {{ this.dataTable.categoryName}}
                        </v-chip>
                    
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="dataTable.search"
                        append-icon="mdi-magnify"
                        label="Procurar"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="dataTable.headers" :items="dataTable.values" :search="dataTable.search" class="body-1">
                        <template v-slot:[`item.available`]="{ item }">
                            <v-chip v-if="item.available == 1" class="ma-2" color="green" text-color="white">Ativo</v-chip>
                            <v-chip v-else class="ma-2" color="red" text-color="white">Inativo</v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </div>




            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="body-1">Deseja realmente deletar o produto <b style="margin-left: 5px"> {{modalDeleteProduct.name}}</b>?</v-card-title>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogDelete = false" >Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm()" >OK</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>



        </div>
    </div>
</template>

<script>
import StoreNavbar from '../../components/store/StoreNavBar.vue'
import StoreCardProduct from '../../components/store/StoreCardProduct.vue'
import ModalCreateProduct from '../../components/store/ModalCreateProduct.vue'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    data() {
        return {
            dialogDelete: false,
            dialog: false,
            token: localStorage.getItem('token'),
            categories: [],
            modalCreateCategory: {
                name: '',
                icon: ''
            },
            dataTable: {
                categorySelected: '',
                categoryName: '',
                search: '',
                headers: [
                    { text: 'Nome', value: 'name' },
                    { text: 'Descrição', sortable: false, value: 'description' },
                    { text: 'Preço', value: 'price' },
                    { text: 'Status', value: 'available' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                values: [
                    
                ],
            },
            modalDeleteProduct: {
                name: '',
                id: ''
            }
        }
    },
    components: {
        StoreNavbar,
        StoreCardProduct,
        ModalCreateProduct
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
            const { id: storeId } = jwt_decode(this.token);

            const data = {
                name: this.modalCreateCategory.name,
                icon: this.modalCreateCategory.icon,
                storeId
            }
            try{
                await axios.post(`http://localhost:3000/category`, data);
                this.dialog = false;
                this.loadCategories();
            }catch(err){
                console.log(err);
            }
        },

        async loadProducts(id, name){
            try{
                var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
                const products = await axios.get(`http://localhost:3000/product/category/${id}`, req);
                this.dataTable.values = products.data;
                this.dataTable.categorySelected = id;
                this.dataTable.categoryName = name;
            }catch(err){
                console.log(err);
            }
        },

        deleteItem (item) {
            this.modalDeleteProduct = item,
            this.dialogDelete = true
        },
        async deleteItemConfirm () {
            try{
                await axios.delete(`http://localhost:3000/product/${this.modalDeleteProduct.id}`);
                this.loadProducts(this.dataTable.categorySelected, this.dataTable.categoryName);
                this.dialogDelete = false;
            }catch(err){
                console.log(err);
            }
        },
    },
    created: async function(){
        await this.loadCategories();
    }
}
</script>

<style scoped>

hr{
    margin: 1rem 0;
    color: inherit;
    background-color: currentColor;
    border: 0;
    opacity: .25;
    height: 1px;
}
.store-products{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.store-products-container{
    margin-left: 60px;
    padding: 45px 12%;
}
.store-products-container-categories{
    display: flex;
}
.store-products-container-header{
    padding: 8px 0;
    display: flex;
    justify-content: end;
}

/* Tabela de produtos */
.store-products-container-products{
    padding: 20px 0;
    font-size: 16px;
}
.store-products-container-products-header{
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
    color: #2b2b2b;
}
.JS-category-new-icon-item input{
    display: none;
}
.JS-category-new-icon-item-radio:checked ~ .JS-category-new-icon-item-label{
    background-color: dodgerblue;
    color: white;
}


</style>
