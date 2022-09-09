<template>
    <div>
        <ul v-if="notEmpty && isFilms" class="films__list">
            <li v-for="film in list" :key="film.id" :class="listItemType">{{ `Titolo: ${film.title} Titolo Originale: ${film.original_title} Lingua Originale: ` }} <img :src="getFlagUrl(film.original_language)"> {{ ` Voto: ${film.vote_average}` }}</li>
        </ul>
        <ul v-if="notEmpty && isSeries" class="series__list">
            <li v-for="serie in list" :key="serie.id" :class="listItemType">{{ `Titolo: ${serie.name} Titolo Originale: ${serie.original_name} Lingua Originale: ` }} <img :src="getFlagUrl(serie.original_language)"> {{ ` Voto: ${serie.vote_average}` }}</li>
        </ul>
    </div>
</template>

<script>

    import state from '../store'

    export default {
        props: {
            type: String,
        },
        computed: {
            listItemType() {
                return this.type.substring(0, this.type.length - 1);
            },
            list() {
                let list;
                if ( this.isFilms )
                    list = state.films;
                else if ( this.isSeries )
                    list = state.series;
                return list;
            },
            isFilms() {
                return this.type === 'films';
            },
            isSeries() {
                return this.type === 'series';
            },
            notEmpty() {
                let stato;
                if ( this.type === 'films')
                    stato = state.films.length > 0;
                if ( this.type === 'series')
                    stato = state.series.length > 0;
                return stato;
            },
        },
        methods: {
            getFlagUrl(lang) {
                if ( lang === 'en' )
                    lang = 'gb';
                if ( lang === 'ja' )
                    lang = 'jp';
                return `https://flagcdn.com/16x12/${lang}.png`
            }
        },
    }
</script>

<style lang="scss" scoped>
    
</style>