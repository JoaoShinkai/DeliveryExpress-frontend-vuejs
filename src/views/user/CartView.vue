<template>
    <div class="user-cart">
        <nav-bar/>
        <div class="user-cart-container">
            <v-stepper v-model="etapa" style="background-color: transparent; box-shadow: none">
                <v-stepper-header style="box-shadow: none">
                    <v-stepper-step :complete="etapa > 1" step="1">
                        Carrinho
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="etapa > 2" step="2">
                        Endereço
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="etapa > 3" step="3">
                        Método de Pagamento
                    </v-stepper-step>
                    
                    <v-divider></v-divider>

                    <v-stepper-step step="4">
                        Conclusão
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items class="py-14">
                    <v-stepper-content step="1">
                        <div class="JS-bag-header">
                            <button><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                        <table class="JS-bag-table">
                            <thead>
                                <tr>
                                <th class="col-5">Item</th>
                                <th class="col-2" style="text-align: center;">Quantidade</th>
                                <th class="col-3" style="text-align: center;">Valor Unitário</th>
                                <th class="col-3" style="text-align: center;">Valor Total</th>
                                <th class="col-1">Excluir</th>
                                <th class="col-1">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="product in products">
                                <tr class="JS-bag-table-product" :key="'header'+product.id">
                                    <td>{{ product.product.name }}</td>
                                    <td style="text-align: center;"> {{ product.quantity }}</td>
                                    <td style="text-align: center;">R$ {{ product.unityPrice }}</td>
                                    <td style="text-align: center;">R$ {{ product.amount }}</td>
                                    <td class="d-flex justify-center"> <a class="btn btn-danger table-btn" data-bs-toggle="modal"><i class="fas fa-trash-alt"></i></a> </td>
                                    <td> <button class="btn btn-warning table-btn"><i class="fas fa-pencil-alt table-btn-pencil"></i></button> </td>
                                </tr>
                                <tr class="JS-bag-table-additionalsRow" :key="'additionals'+product.id">
                                    <td colspan="6">
                                    <div class="JS-bag-table-additionals">
                                        <div class="JS-bag-table-additionals-item" v-for="additional in product.additionals" :key="additional.id"> {{ additional.name }}</div>
                                    </div>
                                    </td>
                                </tr>
                                </template>
                                <tr class="JS-bag-table-delivery" >
                                <td colspan="3"><i class="fas fa-motorcycle"></i>Taxa de entrega</td>
                                <td style="text-align: center;"> R$ {{this.calcTaxaEntrega()}}</td>
                                <td colspan="2"></td>
                                </tr>
                                <tr class="JS-bag-table-subtotal" >
                                <td colspan="3"><b><i class="fas fa-coins"></i> Subtotal</b></td>
                                <td style="text-align: center;"> <b>R$ {{ cartAmount }}</b> </td>
                                </tr>
                                
                            </tbody>
                        </table>

                        <div class="JS-stepper-buttons">
                            <v-btn color="primary" @click="etapa = 2" > Próximo </v-btn>
                        </div>
                        
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <div>
                            <div>
                                <div>Qual será o endereço da entrega?</div>
                                <v-autocomplete
                                ref="country"
                                v-model="address"
                                :rules="[() => !!address.id || 'Esse campo é obrigatório']"
                                :items="addresses"
                                :item-text="concatenateAddress"
                                item-id="id"
                                label="Endereço"
                                placeholder="Select..."
                                return-object
                                @change="submit()"
                                required
                            ></v-autocomplete>
                            </div>
                        </div>

                        <div class="JS-stepper-buttons">
                            <v-btn color="primary" @click="etapa = 3" :disabled="!this.address.id" >Continue</v-btn>
                            <v-btn text @click="etapa = 1"> Voltar </v-btn>
                        </div>

                        
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        
                        <div>
                            <div>
                                <div class="JS-bag-confirm-paymentMethod-container-options">
                                    <input v-model="order.paymentMethod" type="radio" class="JS-bag-confirm-paymentMethod-container-options-radio" id="paymentMethod-cash" name="paymentMethod" value="1"  form="formPedido">
                                    <label class="JS-bag-confirm-paymentMethod-container-options-item paymentMethod-cash-label" for="paymentMethod-cash"><i class="fad fa-money-bill-wave"></i>Dinheiro</label>
                                    <input v-model="order.paymentMethod" type="radio" class="JS-bag-confirm-paymentMethod-container-options-radio" id="paymentMethod-card" name="paymentMethod" value="2"  form="formPedido">
                                    <label class="JS-bag-confirm-paymentMethod-container-options-item paymentMethod-card-label" for="paymentMethod-card"><i class="fad fa-credit-card"></i>Cartão</label>
                                    
                                </div>
                            </div>
                            <div v-if="order.paymentMethod == '1'">
                                <div>Precisa de troco?</div>
                                <v-radio-group v-model="needChangeMoney">
                                    <v-radio label="Sim" :value="true"></v-radio>
                                    <v-radio label="Não" :value="false"></v-radio>
                                </v-radio-group>
                            </div>
                            <div v-if="needChangeMoney">
                                <v-text-field label="Troco para quanto?" outlined></v-text-field>
                            </div>
                        </div>

                        <div class="JS-stepper-buttons">
                            <v-btn color="primary" @click="etapa = 4" :disabled="!this.address.id" >Continue</v-btn>
                            <v-btn text @click="etapa = 2"> Voltar </v-btn>
                        </div>
                        
                    </v-stepper-content>

                    <v-stepper-content step="4">

                        <div>
                            dasdas

                        </div>

                        <div class="JS-stepper-buttons">
                            <v-btn color="primary" ><i class="fa-solid fa-flag"></i> Finalizar Pedido</v-btn>
                            <v-btn text @click="etapa = 3"> Voltar </v-btn>
                        </div>
                        
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/user/NavBar.vue'
import {baseURL} from '../../lib/api'
import axios from 'axios'
    export default {
        data() {
            return{
                token: localStorage.getItem('token'),
                products: [],
                cartAmount: 0,
                etapa: 1,
                addresses: [
                    
                ],
                address: {
                    street: null,
                    id: null
                },
                needChangeMoney: null,
                order: {
                    paymentMethod: null,
                    changeMoney: null,
                }
            }
        },
        components: {
            NavBar
        },
        methods: {
            async loadProducts(){
                try{
                    var req = {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }

                    const res = await axios.get(`${baseURL}/userProduct`, req)

                    this.products = res.data;
                }catch(err){
                    console.log(err)
                }
            },
            async loadAddresses(){
                try{
                    var req = {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }

                    const res = await axios.get(`${baseURL}/address`, req)

                    this.addresses = res.data
                }catch(err){
                    console.log(err);
                }
            },
            async calcAmount(){
                this.products.forEach(element => {
                    this.cartAmount += parseFloat(element.amount)
                });
                const taxa = this.calcTaxaEntrega()
                
                this.cartAmount += taxa;
            },
            calcTaxaEntrega() {
                return this.products.length > 0 ? parseFloat(this.products[0].product.category.store.delivery) : 0
            },
            concatenateAddress(address){
                return `${address.street}, ${address.number}, ${address.district}, ${address.city} - ${address.uf}`
            },
            submit(){
                console.log(this.address)
            }
        },
        created: async function(){
            await this.loadProducts()
            await this.calcAmount()
            await this.loadAddresses()
        }
    }
</script>

<style>
.user-cart{
    background-color: #f2f2f2;
    min-height: 100vh;
}
.user-cart-container{
    padding: 45px 15%;
    padding-left: calc(15% + 60px);
}

.JS-bag-table{
    border-collapse: collapse;
}
.JS-bag-table tbody tr td{
    vertical-align: middle;
}
.JS-bag-table-additionalsRow{
    border-bottom: solid 1px lightgray;
    position: relative;
}
.JS-bag-table-additionalsRow td{
    padding-bottom: 10px;
}
.JS-bag-table-product td{
    padding-top: 10px;
}
.JS-bag-table-additionalsRow::after{
    position: absolute;
    content: "";
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: crimson;
    transition: .5s;
}
.JS-bag-table-additionalsRow:hover::after, .JS-bag-table-product:hover + .JS-bag-table-additionalsRow::after{
    width: 100%;
}
.JS-bag-table-additionals{
    display: flex;
}
.JS-bag-table-additionals-item{
    padding: 3px 12px;
    margin: 3px;
    border-radius: 18px;
    background-color: #e8e6e6;
}

.JS-bag-table-subtotal td{
    padding: 20px;
    font-size: 18px;
}
.JS-bag-table-subtotal td i{
    margin-right:10px;
}
.JS-bag-table-delivery{
    background-color: #dbdbdb;
    border-radius: 10px;
}
.JS-bag-table-delivery td{
    padding: 20px;
}
.JS-bag-table-delivery td i{
    margin-right:10px;
}
.JS-bag-table-delivery td:first-child{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.JS-bag-table-delivery td:last-child{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.table-btn{
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    background-color: #e8e6e6;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}
.table-btn i{
    color: #11101d;
}
.table-btn:hover i, .table-btn:focus i{ 
    color: white;
}
.JS-stepper-buttons{
    display: flex;
    justify-content: end;
    padding: 50px 0;
}

/* Metodo de pagamento */
.JS-bag-confirm-paymentMethod-container-options{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
}
.JS-bag-confirm-paymentMethod-container-options-item{
    background-color: #dbdbdb;
    border-radius: 4px;
    width: 230px;
    height: 120px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    position: relative;
    font-weight: bold;
}
.JS-bag-confirm-paymentMethod-container-options-item i{
    font-size: 26px;
}
.JS-bag-confirm-paymentMethod-container-options-radio{
    display: none;
}
.JS-bag-confirm-paymentMethod-container-options-item::before{
    content: "";
    position: absolute;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border-radius: 14px;
    border: solid 2px #11101d;
    display: none;
}
.JS-bag-confirm-paymentMethod-container-options-radio:checked + .JS-bag-confirm-paymentMethod-container-options-item{
    background-color: #11101d;
    color: white;
}
</style>