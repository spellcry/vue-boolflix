import Vue from 'vue'

const state = Vue.observable({
    films: [],
    series: [],
    query: '',
});

export default state;