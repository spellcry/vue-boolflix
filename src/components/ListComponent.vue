<template>
    <div class="list-wrapper">
        <h3 v-if="notEmpty" class="title">{{ title }}</h3>
        <div v-if="notEmpty" class="filter">
            <select :id="isFilms ? 'films-genres' : 'series-genres'" v-model="filter">
                <option value="1">Tutti</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
            </select>
        </div>
        <ul v-if="notEmpty" :class="[isFilms ? 'films__list' : 'series__list', 'list']">
            <li v-for="item in list" :key="item.id" :class="[listItemType, 'list__item']"><ListItem :type="type" :genres="item.genre_ids" :id="item.id" :overview="item.overview" :title="item.title" :originalTitle="item.original_title" :lang="item.original_language" :vote="item.vote_average" :poster="item.poster_path"/></li>
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
        data() {
            return {
                filter: '1',
            }
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
                            overview: item.overview,
                            genre_ids: item.genre_ids,
                        }                        
                    });
                }
                return list.filter((item) => {
                    return this.filter === '1' ? true : item.genre_ids.includes(this.filter);
                });
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
            genres() {
                let genres = [];
                if ( this.isFilms ) {
                    genres = state.moviesGenre;
                } else if ( this.isSeries ) {
                    genres = state.seriesGenre;
                }
                return genres;
            }
        },
        components: {
            ListItem,
        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .list-wrapper {
        padding-bottom: 5rem;
        .title {
            padding-bottom: 2.5rem;
            text-align: center;
            font-size: 3rem;
        }
        .filter {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 2.5rem;
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        gap: $list-gap;
        .list__item {
            flex-basis: calc(calc(100% - calc($list-gap * 0)) / 1);
            aspect-ratio: 2/3;
        }
    }
    @media (min-width: 650px) {
        .list {
            .list__item {
                flex-basis: calc(calc(100% - calc($list-gap * 1)) / 2);
            }
        }

    }
    @media (min-width: 1000px) {
        .list {
            .list__item {
                flex-basis: calc(calc(100% - calc($list-gap * 2)) / 3);
            }
        }

    }
    @media (min-width: 1300px) {
        .list {
            .list__item {
                flex-basis: calc(calc(100% - calc($list-gap * 3)) / 4);
            }
        }

    }
    @media (min-width: 1650px) {
        .list {
            .list__item {
                flex-basis: calc(calc(100% - calc($list-gap * 4)) / 5);
            }
        }

    }
</style>