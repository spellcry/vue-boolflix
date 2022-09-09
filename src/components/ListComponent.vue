<template>
    <ul class="films__list">
        <li v-for="film in films" :key="film.id" class="film">{{ `Titolo: ${film.title} Titolo Originale: ${film.original_title} Lingua Originale: ${film.original_language} Voto: ${film.vote_average}` }}</li>
    </ul>
</template>

<script>
    import state from '../store'

    export default {
        computed: {
            films() {
                return state.films;
            },
        },
    }
</script>

<style lang="scss" scoped>
    
</style>