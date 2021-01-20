<template>
  <v-app>
    <v-app-bar app color="black" class="translucent" src="https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg" dark>
      <v-img alt="StarWars Logo" class="shrink mr-2" contain src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png" transition="scale-transition" height="100%" width="160" />

      <v-spacer></v-spacer>
      <v-btn :height="$vuetify.breakpoint.xs ? '' : '100%'" :small="$vuetify.breakpoint.xs" :fab="$vuetify.breakpoint.xs" to="/" outlined tile color="neutral"><v-icon v-if="$vuetify.breakpoint.xs">mdi-format-list-bulleted</v-icon><span v-else>Lista Completa</span></v-btn>
    </v-app-bar>
    <v-main>
      <transition name="routers" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <v-footer app>
      <v-spacer></v-spacer>
      <h5 class="neutral--text text-caption">Criado por <span class="primary--text">Alexandre Sartori</span> como tarefa para a <a href="https://binamik.com.br/" target="_blank" class="binamik--text">Binamik</a> <v-icon color="binamik">mdi-alpha-b-circle</v-icon></h5>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    components: {},

    data: () => ({
      //
    }),
    created() {
      this.$store.dispatch('loadAllPeople')
    },
  }
</script>
<style lang="scss" scoped>
  .starwars-bg {
    background-image: url('https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg');
  }
  .routers-enter-active,
  .routers-leave-active {
    transition: 0.5s;
  }
  .routers-enter,
  .routers-leave-to {
    transform: rotateY(90deg);
    opacity: 0;
  }
  .translucent{
    opacity: 0.9;
  }
</style>
