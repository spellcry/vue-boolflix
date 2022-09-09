<template>
  <div id="app">
    <MainHeader/>
    <MainContent/>
  </div>
</template>

<script>
  import axios from 'axios'
  import state from './store'
  import MainHeader from './components/HeaderComponent.vue'
  import MainContent from './components/MainContentComponent.vue'

  export default {

    name: 'App',
    components: {
      MainHeader,
      MainContent,
    },
    data() {
      return {
        baseUri: 'https://api.themoviedb.org/3',
        apiKey: '5702129c9507efdfcd526d3dbc3febce',
        language: 'it-IT',
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
        axios.get(`${this.baseUri}/search/movie`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
        }
        })
        .then((res) => {
          state.films = res.data.results;
        });
      },
      getSeries() {
        axios.get(`${this.baseUri}/search/tv`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
        }
        })
        .then((res) => {
          state.series = res.data.results;
        });
      },
    },
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
