<template>
  <v-container>
    <v-card v-if="character.name" img="https://miro.medium.com/max/2560/1*4tqFvNBN3aPjWJAnkLsG2w.jpeg">
      <v-card-title class="translucent-background neutral--text">
        <v-spacer></v-spacer>
        <h2>{{ character.name }}</h2>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text class="translucent-background">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text>
                <v-img :src="character.image"></v-img>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-card-text>
                <p>Altura: {{ character.height }}cm</p>
                <p>Peso: {{ character.mass == "unknown" ? "- - - " : character.mass }}Kg</p>
                <p>
                  Cor do cabelo:
                  <v-icon :color="getHairColor(character.hair_color)">{{ character.hair_color == "n/a" ? "mdi-cancel" : character.hair_color == "none" ? "mdi-crop-square" : "mdi-square" }}</v-icon>
                </p>
                <p>Cor da pele: {{ character.skin_color }}</p>
                <p>
                  Cor dos olhos:
                  <v-icon :color="character.eye_color">mdi-eye</v-icon>
                </p>
                <p>Ano de nascimento: {{ character.birth_year == "unknown" ? "- - - " : character.birth_year }}</p>
                <p>Genero: {{ character.gender == "male" ? "Masculino" : character.gender == "female" ? "Feminino" : "- - -" }}</p>
                <p>
                  Planeta de origem:
                  <v-btn small :fab="$vuetify.breakpoint.xs" tile outlined color="neutral" @click="getPlanet(character.homeworld)"><span v-if="!$vuetify.breakpoint.xs">Ver Planeta</span><v-icon>mdi-call-made</v-icon></v-btn>
                </p>
                <p>
                  Filmes: <v-btn small :fab="$vuetify.breakpoint.xs" tile outlined color="neutral" @click="getMovies(character.films)"><span v-if="!$vuetify.breakpoint.xs">Ver Filmes</span><v-icon>mdi-call-made</v-icon></v-btn>
                </p>
                <p>
                  Espécie: <v-btn small :fab="$vuetify.breakpoint.xs" tile outlined color="neutral" @click="getSpecies(character.species)"><span v-if="!$vuetify.breakpoint.xs">Ver Espécie</span><v-icon>mdi-call-made</v-icon></v-btn>
                </p>
                <p>
                  Veículos: <v-btn small :fab="$vuetify.breakpoint.xs" tile outlined color="neutral" @click="getVehicles(character.vehicles)"><span v-if="!$vuetify.breakpoint.xs">Ver Veículos</span><v-icon>mdi-call-made</v-icon></v-btn>
                </p>
                <p>
                  Naves espaciais: <v-btn small :fab="$vuetify.breakpoint.xs" tile outlined color="neutral" @click="getStarships(character.starships)"><span v-if="!$vuetify.breakpoint.xs">Ver Naves espaciais</span><v-icon>mdi-call-made</v-icon></v-btn>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-if="planetCard" :fullscreen="$vuetify.breakpoint.xs" v-model="planetCard" max-width="500px" transition="dialog-transition">
      <v-card color="grey darken-3" img="https://wallpapercave.com/wp/EerviPX.jpg">
        <v-card-title class="primary">
          {{ planet.name != "unknown" ? planet.name : "Desconhecido" }}
          <v-spacer></v-spacer>
          <v-icon @click="planetCard = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-2 translucent-background">
          <p>Período de rotação: {{ planet.rotation_period != 0 ? planet.rotation_period + " horas" : "Desconhecido" }}</p>
          <p>Período orbital: {{ planet.orbital_period != 0 ? planet.orbital_period + " dias" : "Desconhecido" }}</p>
          <p>Diametro: {{ planet.diameter != 0 ? planet.diameter + "Km" : "Desconhecido" }}</p>
          <p>Clima: {{ planet.climate != "unknown" ? planet.climate : "Desconhecido" }}</p>
          <p>Gravidade: {{ planet.gravity != "unknown" ? planet.gravity.replace("standard", "") + "G" : "Desconhecido" }}</p>
          <p>Terreno: {{ planet.terrain != "unknown" ? planet.terrain : "Desconhecido" }}</p>
          <p>Água na superficie: {{ planet.surface_water != "unknown" ? planet.surface_water + "%" : "Desconhecido" }}</p>
          <p>População total: {{ planet.population != "unknown" ? parseInt(planet.population).toLocaleString() + " Hab." : "Desconhecido" }}</p>
        </v-card-text>
        <v-card-actions class="secondary">
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="movieCard" :fullscreen="$vuetify.breakpoint.xs" scrollable v-model="movieCard" max-width="1600px" transition="dialog-transition">
      <v-card :loading="loadingMovies" color="grey darken-3" img="https://wallpaperaccess.com/full/368496.jpg">
        <v-card-title class="neutral black--text">
          Filmes com este personagem:
          <v-spacer></v-spacer>
          <v-icon color="black" @click="movieCard = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-2 translucent-background">
          <v-row justify="center">
            <v-col cols="12" md="4" v-for="movie in movies" :key="movie.episode_id">
              <v-card height="100%" hover tile color="transparent">
                <v-card-title class="neutral--text translucent-title-2">
                  {{ movie.title }}
                  <v-spacer></v-spacer>
                  Episódio {{ movie.episode_id }}
                </v-card-title>
                <v-card-text class="translucent-background-2">
                  <div class="py-3 neutral--text">{{ movie.opening_crawl }}</div>
                  <div class="py-3 neutral--text"><strong>Diretor:</strong> {{ movie.director }}</div>
                  <div class="py-3 neutral--text"><strong>Produtor:</strong> {{ movie.producer }}</div>
                  <div class="py-3 neutral--text"><strong>Data de lançamento:</strong> {{ formatDate(movie.release_date) }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-if="speciesCard" :fullscreen="$vuetify.breakpoint.xs" scrollable v-model="speciesCard" max-width="500px" transition="dialog-transition">
      <v-card color="grey darken-3" :loading="loadingSpecies" img="https://www.denofgeek.com/wp-content/uploads/2019/12/star-wars-alien-races.jpg?resize=768%2C432">
        <v-card-title class="primary">
          Espécie deste personagem:
          <v-spacer></v-spacer>
          <v-icon @click="speciesCard = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-2 translucent-background">
          <v-row justify="center">
            <v-col cols="12" v-for="specie in species" :key="specie.name">
              <v-card height="100%" hover tile color="transparent">
                <v-card-text class="translucent-background-2">
                  <div class="py-1 "><strong>Nome:</strong> {{ specie.name }}</div>
                  <div class="py-1 "><strong>Classificação:</strong> {{ specie.classification }}</div>
                  <div class="py-1 "><strong>Designação:</strong> {{ specie.designation }}</div>
                  <div class="py-1 "><strong>Altura média:</strong> {{ specie.average_height }}</div>
                  <div class="py-1 "><strong>Cores de pele:</strong> {{ specie.skin_colors }}</div>
                  <div class="py-1 "><strong>Cores de cabelo:</strong> {{ specie.hair_colors }}</div>
                  <div class="py-1 "><strong>Cores de olhos:</strong> {{ specie.eye_colors }}</div>
                  <div class="py-1 "><strong>Média de vida:</strong> {{ specie.average_lifespan }}</div>
                  <div class="py-1 "><strong>Linguagem:</strong> {{ specie.language }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="secondary">
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="vehiclesCard" :fullscreen="$vuetify.breakpoint.xs" scrollable v-model="vehiclesCard" max-width="1600px" transition="dialog-transition">
      <v-card color="grey darken-3" :loading="loadingVehicles" img="https://mir-s3-cdn-cf.behance.net/project_modules/fs/cde61a64939783.5ae2a160a78fd.jpg">
        <v-card-title class="primary">
          Veículos deste personagem:
          <v-spacer></v-spacer>
          <v-icon @click="vehiclesCard = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-2 translucent-background">
          <v-row justify="center">
            <v-col cols="12" md="4" v-for="vehicle in vehicles" :key="vehicle.name">
              <v-card height="100%" hover tile color="transparent">
                <v-card-title class="translucent-title-2">
                  <v-spacer></v-spacer>
                  {{ vehicle.name }}
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="translucent-background-2">
                  <div class="py-1"><strong>Modelo:</strong> {{ vehicle.model }}</div>
                  <div class="py-1"><strong>Produtor:</strong> {{ vehicle.manufacturer }}</div>
                  <div class="py-1"><strong>Valor:</strong> {{ vehicle.cost_in_credits }}</div>
                  <div class="py-1"><strong>Comprimento:</strong> {{ vehicle.length }}</div>
                  <div class="py-1"><strong>Velocidade atmosférica máxima:</strong> {{ vehicle.max_atmosphering_speed }}</div>
                  <div class="py-1"><strong>Nº de ocupantes:</strong> {{ vehicle.crew }}</div>
                  <div class="py-1"><strong>Passageiros:</strong> {{ vehicle.passengers }}</div>
                  <div class="py-1"><strong>Capacidade de carga:</strong> {{ vehicle.cargo_capacity }}</div>
                  <div class="py-1"><strong>Consumiveis:</strong> {{ vehicle.consumables }}</div>
                  <div class="py-1"><strong>Classe:</strong> {{ vehicle.vehicle_class }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="secondary"> </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-if="starshipCard" :fullscreen="$vuetify.breakpoint.xs" scrollable v-model="starshipCard" max-width="1600px" transition="dialog-transition">
      <v-card color="grey darken-3" :loading="loadingStarships" img="https://vulkk.com/wp-content/uploads/2017/09/All-Star-Wars-Battlefront-II-Ships-and-Ground-Vehicles-Guide.jpg">
        <v-card-title class="primary">
          Naves espaciais deste personagem:
          <v-spacer></v-spacer>
          <v-icon @click="starshipCard = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-2 translucent-background">
          <v-row justify="center">
            <v-col cols="12" md="4" v-for="starship in starships" :key="starship.name">
              <v-card height="100%" hover tile color="transparent">
                <v-card-title class="translucent-title-2">
                  <v-spacer></v-spacer>
                  {{ starship.name }}
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="translucent-background-2">
                  <div class="py-1"><strong>Modelo:</strong> {{ starship.model }}</div>
                  <div class="py-1"><strong>Fabricante:</strong> {{ starship.manufacturer }}</div>
                  <div class="py-1"><strong>Valor:</strong> {{ starship.cost_in_credits }}</div>
                  <div class="py-1"><strong>Comprimento:</strong> {{ starship.length }}</div>
                  <div class="py-1"><strong>Velocidade atmosférica máxima:</strong> {{ starship.max_atmosphering_speed }}</div>
                  <div class="py-1"><strong>Tripulação:</strong> {{ starship.crew }}</div>
                  <div class="py-1"><strong>Passageiros:</strong> {{ starship.passengers }}</div>
                  <div class="py-1"><strong>Capacidade de carga:</strong> {{ starship.cargo_capacity }}</div>
                  <div class="py-1"><strong>Consumiveis:</strong> {{ starship.consumables }}</div>
                  <div class="py-1"><strong>Capacidade de Hiperdrive:</strong> {{ starship.hyperdrive_rating }}</div>
                  <div class="py-1"><strong>MGLT:</strong> {{ starship.MGLT }}</div>
                  <div class="py-1"><strong>Classe:</strong> {{ starship.starship_class }}</div>
                  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="secondary"> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      planet: null,
      movies: [],
      species: [],
      vehicles: [],
      starships: [],
      planetCard: false,
      movieCard: false,
      speciesCard: false,
      vehiclesCard: false,
      starshipCard: false,
      loadingMovies: false,
      loadingSpecies: false,
      loadingVehicles: false,
      loadingStarships: false,
      sa: {
        name: "Death Star",
        model: "DS-1 Orbital Battle Station",
        manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
        cost_in_credits: "1000000000000",
        length: "120000",
        max_atmosphering_speed: "n/a",
        crew: "342,953",
        passengers: "843,342",
        cargo_capacity: "1000000000000",
        consumables: "3 years",
        hyperdrive_rating: "4.0",
        MGLT: "10",
        starship_class: "Deep Space Mobile Battlestation",
      },
    };
  },
  methods: {
    getHairColor(c) {
      switch (c) {
        case "n/a":
          return "black";

        case "none":
          return "black";

        default:
          return c;
      }
    },
    getPlanet(url) {
      axios.get(url).then((r) => {
        this.planet = r.data;
        this.planetCard = true;
      });
    },
    getMovies(movies) {
      this.movies = [];
      this.loadingMovies = true;
      var promises = [];
      for (const [iterator, mov] of movies.entries()) {
        promises.push(axios.get(mov));
        iterator;
      }
      this.movieCard = true;
      Promise.all(promises).then((v) => {
        
        for (const [iterator, mov] of v.entries()) {
          this.movies.push(mov.data);
          iterator;
        }
        this.loadingMovies = false;
      });
    },
    getSpecies(species) {
      if (species.length) {
        this.species = [];
        this.loadingSpecies = true;
        var promises = [];
        for (const [iterator, spec] of species.entries()) {
          promises.push(axios.get(spec));
          iterator;
        }
        this.speciesCard = true;
        Promise.all(promises).then((v) => {
          for (const [iterator, spec] of v.entries()) {
            this.species.push(spec.data);
            iterator;
          }
          this.loadingSpecies = false;
        });
      } else {
        window.alert("Personagem sem espécie cadastrada");
      }
    },
    getVehicles(vehicle) {
      if (vehicle.length) {
        this.vehicles = [];
        this.loadingVehicles = true;
        var promises = [];
        for (const [iterator, vehi] of vehicle.entries()) {
          promises.push(axios.get(vehi));
          iterator;
        }
        this.vehiclesCard = true;
        Promise.all(promises).then((v) => {
          for (const [iterator, vehi] of v.entries()) {
            this.vehicles.push(vehi.data);
            iterator;
          }
          this.loadingVehicles = false;
        });
      } else {
        window.alert("Personagem sem veiculo cadastrado");
      }
    },
    getStarships(starship) {
      if (starship.length) {
        this.starships = [];
        this.loadingStarships = true;
        var promises = [];
        for (const [iterator, vehi] of starship.entries()) {
          promises.push(axios.get(vehi));
          iterator;
        }
        this.starshipCard = true;
        Promise.all(promises).then((v) => {
          for (const [iterator, vehi] of v.entries()) {
            this.starships.push(vehi.data);
            iterator;
          }
          this.loadingStarships = false;
        });
      } else {
        window.alert("Personagem sem Naves espaciais cadastrado");
      }
    },
    formatDate(date) {
      var [a, m, d] = date.split("-");
      return d + "/" + m + "/" + a;
    },
  },
  computed: {
    character: {
      get() {
        return this.$store.getters.getCharacter;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.translucent-background {
  background-color: rgba($color: #000000, $alpha: 0.8) !important;
}
.translucent-background-2 {
  background-color: rgba($color: #000000, $alpha: 0.6) !important;
}
.translucent-title-2 {
  background-color: rgba($color: #202020, $alpha: 0.8) !important;
}
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1f1f1f;
}

::-webkit-scrollbar-thumb {
  background: rgb(185, 151, 0);
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(255, 174, 0);
}
</style>
