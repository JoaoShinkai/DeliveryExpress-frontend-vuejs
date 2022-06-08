<template>
  <v-app>
    <nav-bar />
    <v-main style="margin-left: 60px;">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from './components/user/NavBar.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
      NavBar
  },
};
</script>

<style scoped>

#app{
}
</style>
