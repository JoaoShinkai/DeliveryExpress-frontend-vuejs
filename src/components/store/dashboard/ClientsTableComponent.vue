<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Nome
                    </th>
                    <th class="text-left">
                        Pedidos
                    </th>
                    </tr>
                </thead>
                <tbody class="clients-table-component-body">
                    <tr v-for="item in desserts" :key="item.name">
                      <td class="clients-table-component-body-item-name"> {{ item.name }}</td>
                      <td>{{ item.ordersQuantity }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import axios from 'axios';
import {baseURL} from '../../../lib/api'
export default {
    data(){
        return{
            desserts: [
            
          ],

          token: localStorage.getItem('token'),
          req: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        }
    },
    methods: {
      async loadData(){
        try{
          const res = await axios.get(`${baseURL}/order/count-top-clients`, this.req);

          this.desserts = res.data;
        }catch(err){
          console.log(err);
        }
      }
    },
    created: async function(){
      await this.loadData()
    }
}
</script>

<style>
.clients-table-component-body-item-name{
  position: relative;
  padding-left: 35px !important;
}
.clients-table-component-body tr:nth-child(1) .clients-table-component-body-item-name::before{
  content: "\f5a2";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 10px;
  top: 50%;
  color: #fbc531;
  transform: translate(0, -50%);
}
.clients-table-component-body tr:nth-child(2) .clients-table-component-body-item-name::before{
  content: "\f5a2";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 10px;
  top: 50%;
  color: #7f8fa6;
  transform: translate(0, -50%);
}
.clients-table-component-body tr:nth-child(3) .clients-table-component-body-item-name::before{
  content: "\f5a2";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 10px;
  top: 50%;
  color: #f19066;
  transform: translate(0, -50%);
}
</style>