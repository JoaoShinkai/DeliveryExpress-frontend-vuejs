<template>
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on" class="nav-link-text">
              <v-list-item-title class="navbar-link-option"><i class="fa-solid fa-trash-can"></i> Excluir</v-list-item-title>
          </v-list-item>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Confirmar exclusão
        </v-card-title>
        <v-card-text style="font-size: 17px">Tem certeza que deseja excluir a categoria <b>{{ this.name }}</b> permanentemente?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteCategory()">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>

      <alert-component v-if="alert.isVisible" :message="alert.message" :status="alert.status" @closeAlert="alert.isVisible = false"/>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import {baseURL} from '../../lib/api'
import AlertComponent from '../AlertComponent.vue'
export default {
    data() {
        return {
            dialog: false,
            token: localStorage.getItem('token'),
            req: {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            },
            alert: {
              isVisible: false,
              message: '',
              status: 0
            }
        }
    },
    props: {
        id: Number,
        name: String
    },
    methods: {
      showAlert(message, statusCode){
            this.alert.message = message;
            this.alert.status = statusCode,
            this.alert.isVisible = true
            setTimeout(() => {
                this.alert.isVisible = false
            },5300)
        },
        async deleteCategory(){
          try{
            await axios.delete(`${baseURL}/category/${this.id}`, this.req);

            this.showAlert("Categoria excluída com sucesso", 1);
            this.dialog = false;
            this.$emit("deletedCategory")
          }catch(err){
            console.log(err)
          }

        }
    },
    components: {
      AlertComponent
    }
}
</script>

<style>

</style>