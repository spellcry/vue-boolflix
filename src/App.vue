<template>
  <div id="app">
    <MainHeader/>
    <div v-if="!loadedFilms && !loadedSeries & !loadedGenres" class="main-content__loader">
      <LoaderComponent/>
    </div>
    <MainContent v-if="loadedFilms && loadedSeries & loadedGenres"/>
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
    computed: {
      baseUri() {
        return state.baseUri;
      },
      apiKey() {
        return state.apiKey;
      },
      language() {
        return state.language;
      },
      query() {
        return state.query;
      },
      loadedFilms() {
        return state.loadedFilms;
      },
      loadedSeries() {
        return state.loadedSeries;
      },
      loadedGenres() {
        return state.loadedGenres;
      },
      filmsPage() {
        return state.shownFilmsPage;
      },
      seriesPage() {
        return state.shownSeriesPage;
      },
    },
    watch: {
      query() {
        if ( this.query !== '' )
          this.getFilms();
          this.getSeries();
          this.getMoviesGenres();
          this.getSeriesGenres();
      },
      filmsPage() {
        this.getFilms();
      },
      seriesPage() {
        this.getSeries();
      }
    },
    methods: {
      getFilms() {
        state.loadedFilms = false;
        axios.get(`${this.baseUri}/search/movie`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
          page: this.filmsPage,
        }
        })
        .then((res) => {
          state.films = res.data.results;
          state.totalFilmsPages = res.data.total_pages;
        })
        .finally(() => {
          state.loadedFilms = true;
        });
      },
      getSeries() {
        state.loadedSeries = false;
        axios.get(`${this.baseUri}/search/tv`,{
        params: {
          api_key: this.apiKey,
          query: this.query,
          language: this.language,
          page: this.seriesPage,
        }
        })
        .then((res) => {
          state.series = res.data.results;
          state.totalSeriesPages = res.data.total_pages;
        })
        .finally(() => {
          state.loadedSeries = true;
        });
      },
      getMoviesGenres() {
        state.loadedGenres = false;
        axios.get(`${this.baseUri}/genre/movie/list`,{
          params: {
            api_key: this.apiKey,
            language: this.language,
          }
        })
        .then((res) => {
          state.moviesGenre = res.data.genres;
        })
        .finally(() => {
          state.loadedGenres = true;
        });
      },
      getSeriesGenres() {
        axios.get(`${this.baseUri}/genre/tv/list`,{
          params: {
            api_key: this.apiKey,
            language: this.language,
          }
        })
        .then((res) => {
          state.seriesGenre = res.data.genres;
        });
      }
    },
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
  #app {
    height: calc(100vh - 131px);
  }

  .main-content__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  @media (min-width: 600px) {
    #app {
      height: calc(100vh - 85px);
    }
  }
</style>
