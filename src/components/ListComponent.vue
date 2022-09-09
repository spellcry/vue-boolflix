<template>
    <div>
        <ul v-if="notEmpty && isFilms" class="films__list">
            <li v-for="film in list" :key="film.id" :class="listItemType"><ListItem :title="film.title" :originalTitle="film.original_title" :lang="film.original_language" :vote="film.vote_average"/></li>
        </ul>
        <ul v-if="notEmpty && isSeries" class="series__list">
            <li v-for="serie in list" :key="serie.id" :class="listItemType"><ListItem :title="serie.name" :originalTitle="serie.original_name" :lang="serie.original_language" :vote="serie.vote_average"/></li>
        </ul>
    </div>
</template>

<script>
    import state from '../store'
    import ListItem from './ListItemComponent.vue'

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
        components: {
            ListItem,
        }
    }
</script>

<style lang="scss" scoped>
    
</style>