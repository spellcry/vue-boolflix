<template>
  <div id="app">

  </div>
</template>

<script>
  import axios from 'axios'

  export default {

    name: 'App',
    components: {
      
    },
    data() {
      return {
        baseUri: 'https://api.themoviedb.org/3',
        apiKey: '5702129c9507efdfcd526d3dbc3febce',
        query: 'ritorno',
        language: 'it-IT',
      }
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
            console.log(res);
          });
      }
    },
    mounted() {
      this.getFilms();
    }
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
