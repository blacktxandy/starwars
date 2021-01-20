<template>
  <v-container>
    <v-card>
      <v-card-title class="neutral--text">
        <v-spacer></v-spacer>
        <div>
          <h3 class="text-button">Lista dos {{ items.length }} personagens de StarWars</h3>
          <h5 class="text-center text-caption">Clique para mais detalhes</h5>
        </div>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-title>
        <v-text-field hide-details name="search" label="Buscar..." v-model="search" append-icon="mdi-magnify"></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table @click:row="openCharacter" disable-pagination :item-class="rowClass" :headers="headers" :items="items" item-key="id" :loading="loading" :search="search"> </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        search: '',
        headers: [
          { text: 'Name', align: 'start', sortable: true, value: 'name' },
          { text: 'Height', align: 'center', sortable: true, value: 'height' },
          { text: 'Mass', align: 'center', sortable: true, value: 'mass' },
          { text: 'Hair Color', align: 'right', sortable: true, value: 'hair_color' },
          { text: 'Skin Color', align: 'right', sortable: true, value: 'skin_color' },
          { text: 'Eye Color', align: 'right', sortable: true, value: 'eye_color' },
          { text: 'Birth Year', align: 'center', sortable: true, value: 'birth_year' },
          { text: 'Gender', align: 'center', sortable: true, value: 'gender' },
        ],
      }
    },
    methods: {
      openCharacter(c) {
        var n = c.url
        n = n.replace('http://swapi.dev/api/people/', '')
        n = n.replace('/', '')
        n = parseInt(n)
        this.$router.push('/people/' + n)
        this.$store.commit('setSelected', n)
      },
      rowClass(item) {
        return item ? 'list-item' : ''
      },
    },
    computed: {
      items: {
        get() {
          return this.$store.getters.getPeople
        },
      },
      loading: {
        get() {
          return !this.$store.getters.getLoaded
        },
      },
    },
  }
</script>
<style lang="scss">
  .list-item {
    cursor: pointer;
    transition: 250ms;
  }
  .list-item:hover {
    background-color: #f7a90066 !important;
  }
  .list-item:active {
    background-color: #fffc608f !important;
    transition: 50ms;
  }
</style>
