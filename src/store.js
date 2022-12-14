import Vue from 'vue'

const state = Vue.observable({
    films: [],
    series: [],
    query: '',
    baseUri: 'https://api.themoviedb.org/3',
    apiKey: '5702129c9507efdfcd526d3dbc3febce',
    language: 'it-IT',
    loadedFilms: true,
    loadedSeries: true,
    loadedGenres: true,
    moviesGenre: [],
    seriesGenre: [],
    totalFilmsPages: 0,
    totalSeriesPages: 0,
    shownFilmsPage: 1,
    shownSeriesPage: 1,
});

export default state;