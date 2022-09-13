<template>
  <div id="app">
    <MainHeader/>
    <div v-if="!loadedFilms && !loadedSeries" class="main-content__loader">
      <LoaderComponent/>
    </div>
    <MainContent v-if="loadedFilms && loadedSeries"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import state from './store'
  import MainHeader from './components/HeaderComponent.vue'
  import MainContent from './components/MainContentComponent.vue'
  import LoaderComponent from './components/LoaderComponent.vue'

  export default {

    name: 'App',
    components: {
      MainHeader,
      MainContent,
      LoaderComponent,
    },
    data() {
      return {
        baseUri: 'https://api.themoviedb.org/3',
        apiKey: '5702129c9507efdfcd526d3dbc3febce',
        language: 'it-IT',
        loadedFilms: true,
        loadedSeries: true,
      }
    },
    computed: {
      query() {
        return state.query;
      }
    },
    watch: {
      query() {
        if ( this.query !== '' )
          this.getFilms();
          this.getSeries();
      },
    },
    methods: {
      getFilms() {
        this.loadedFilms = false;
        axios.get(`${this.baseUri}/search/movie`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
        }
        })
        .then((res) => {
          state.films = res.data.results;
        })
        .finally(() => {
          this.loadedFilms = true;
        });
      },
      getSeries() {
        this.loadedSeries = false;
        axios.get(`${this.baseUri}/search/tv`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
        }
        })
        .then((res) => {
          state.series = res.data.results;
        })
        .finally(() => {
          this.loadedSeries = true;
        });
      },
    },
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
  #app {
    height: calc(100vh - 85px);
  }

  .main-content__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
