<template>
  <v-app>
    
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
  
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600&display=swap');


#app{
  font-family: 'Barlow', sans-serif;
}


</style>
