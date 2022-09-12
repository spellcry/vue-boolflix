<template>
    <div class="list-wrapper">
        <h3 v-if="notEmpty" class="title">{{ title }}</h3>
        <ul v-if="notEmpty" :class="[isFilms ? 'films__list' : 'series__list', 'list']">
            <li v-for="item in list" :key="item.id" :class="[listItemType, 'list__item']"><ListItem :overview="item.overview" :title="item.title" :originalTitle="item.original_title" :lang="item.original_language" :vote="item.vote_average" :poster="item.poster_path"/></li>
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
                else if ( this.isSeries ) {
                    list = state.series;
                    list = list.map((item) => {
                        return {
                            id: item.id,
                            title: item.name,
                            original_title: item.original_name,
                            original_language: item.original_language,
                            vote_average: item.vote_average,
                            poster_path: item.poster_path,
                        }                        
                    });
                }
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
                if ( this.isFilms )
                    stato = state.films.length > 0;
                if ( this.isSeries )
                    stato = state.series.length > 0;
                return stato;
            },
            title() {
                let title;
                if ( this.isFilms )
                    title = 'Film';
                else if ( this.isSeries )
                    title = 'Serie TV';
                return title;
            },
        },
        components: {
            ListItem,
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .list-wrapper {
        margin-bottom: 5rem;
        .title {
            padding-bottom: 2.5rem;
            text-align: center;
            font-size: 3rem;
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        gap: $list-gap;
        .list__item {
            flex-basis: calc(calc(100% - calc($list-gap * 5)) / 6);
            height: 500px;
        }
    }
</style>