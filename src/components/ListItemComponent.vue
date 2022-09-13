<template>
    <div class="card">
        <div class="inner-wrapper">
            <div class="info">
                <p class="title"><span class="info-name">Titolo:</span> {{ title }}</p>
                <p class="original-title"><span class="info-name">Titolo Originale:</span> {{ originalTitle }}</p>
                <p class="lang"><span class="info-name">Lingua Originale:</span> <img :src="getFlagUrl(lang)"></p>
                <p class="actors">
                    <span class="info-name">Attori:</span>
                    {{ actors }}
                </p>
                <p class="genres">
                    <span class="info-name">Generi:</span>
                    {{ genresFormatted }}
                </p>
                <p class="vote">
                    <span class="info-name">
                        Voto:
                    </span>
                    <template v-if="voteModified > 0">
                        <font-awesome-icon v-for="n in voteModified" :key="n" icon="fa-solid fa-star" />
                    </template>
                    <font-awesome-icon v-for="n in 5 - voteModified" :key="n + voteModified" icon="fa-regular fa-star" />
                </p>
                <p v-if="hasOverview" class="overview"><span class="info-name">Anteprima:</span> {{ overviewCutted }}</p>
            </div>
            <div class="poster">
                <img v-if="hasPoster" :src="getPoster()">
                <font-awesome-icon v-else icon="fa-regular fa-circle-xmark" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import state from '../store'

export default {
    props: {
        id: Number,
        title: String,
        originalTitle: String,
        lang: String,
        vote: Number,
        poster: String,
        overview: String,
        type: String,
        genres: Array,
    },
    data() {
        return {
            dimensione: 'w342',
            posterVisible: false,
            credits: [],
        }
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
        hasPoster() {
            return this.posterVisible;
        },
        hasOverview() {
            return this.overview.length > 0;
        },
        voteModified() {
            return Math.ceil(this.vote / 2);
        },
        overviewCutted() {
            return this.overview.substring(0, 150) + '...';
        },
        actors() {
            let stringa = '';
            this.credits.forEach((actor, index) => {
                if ( index === this.credits.length - 1 )
                    stringa += `${actor.name}`
                else
                    stringa += `${actor.name}, `
            });
            return stringa;
        },
        genresFormatted() {
            let stringa = '';
            if ( this.type === 'films' ) {
                this.genres.forEach((genre, index) => {
                    state.moviesGenre.forEach(objGenre => {
                        if ( genre === objGenre.id ) {
                            if ( index === this.genres.length - 1)
                                stringa += `${objGenre.name}`
                            else
                                stringa += `${objGenre.name}, `                            
                        }                    
                    });
                });
            } else if ( this.type === 'series' ) {
                this.genres.forEach((genre, index) => {
                    state.seriesGenre.forEach(objGenre => {
                        if ( genre === objGenre.id ) {
                            if ( index === this.genres.length - 1)
                                stringa += `${objGenre.name}`
                            else
                                stringa += `${objGenre.name}, `                            
                        }                    
                    });
                });
            }
            return stringa;
        },
    },
    methods: {
        getFlagUrl(lang) {
            if ( lang === 'en' )
                lang = 'gb';
            if ( lang === 'ja' )
                lang = 'jp';
            return `https://flagcdn.com/16x12/${lang}.png`
        },
        getPoster() {
            return `https://image.tmdb.org/t/p/${this.dimensione}/${this.poster}`;
        },
        isVisible() {
            if ( this.poster !== null ) {
                axios.get(`https://image.tmdb.org/t/p/${this.dimensione}/${this.poster}`)
                    .then(() => {
                        this.posterVisible = true;
                    })
                    .catch(() => {
                        this.posterVisible = false;
                    });
            } else {
                this.posterVisible = false;
            }
        },
        getCredits() {            
            axios.get(`${this.baseUri}/movie/${this.id}/credits?api_key=${this.apiKey}&language=${this.language}`)
                .then((res) => {
                    const actors = res.data.cast;
                    let actorsLength = actors.length >= 5 ? 5 : actors.length;
                    for ( let i = 0; i < actorsLength; i++ ) {
                        this.credits.push(actors[i]);
                    }                                        
                })
                .catch(() => {
                    this.credits.push('nessuno');
                });
        },
    },
    mounted() {
        this.isVisible();
        this.getCredits();
    }
}
</script>

<style lang="scss" scoped>
    .card {
        height: 100%;
        .inner-wrapper {
            position: relative;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 400ms ease-in-out;
        }
        &:hover .inner-wrapper {
            transform: rotateY(180deg);
        }
        .info,
        .poster {
            backface-visibility: hidden;
            overflow: hidden;
        }
        .info {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding: 1.2rem;
            transform: rotateY(180deg);
            background-color: #333;
            line-height: 1.2;
            .info-name{
                font-weight: bold;
            }
            .lang {
                img {
                    width: 16px;
                }
            }
            .vote {
                .fa-star {
                    color: gold
                }
            }
            .overview {
                line-height: 1.4;
            }
        }
        .poster {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                height: 100%;
                object-fit: cover;
            }
            .fa-circle-xmark {
                font-size: 5rem;
            }
        }
    }
</style>