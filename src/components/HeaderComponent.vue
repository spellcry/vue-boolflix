<template>
    <header class="main-header">
        <h1 class="main-header__title">BoolFlix</h1>
        <div class="search">
            <input type="text" class="search__input" v-model="query">
            <button @click="getFilms" class="search__btn">Cerca</button>
        </div>
    </header>
</template>

<script>
    import axios from 'axios'
    import state from '../store'

    export default {
        data() {
            return {
                baseUri: 'https://api.themoviedb.org/3',
                apiKey: '5702129c9507efdfcd526d3dbc3febce',
                query: '',
                language: 'it-IT',
            }
        },
        watch: {
            query() {
                state.query = this.query;
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
                    state.films = res.data.results;
                });
            },
        },
    }

</script>

<style lang="scss" scoped>
    
</style>