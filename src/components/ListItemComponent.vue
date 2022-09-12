<template>
    <div class="card">
        <div class="inner-wrapper">
            <div class="info">
                <p class="title"><span class="info-name">Titolo:</span> {{ title }}</p>
                <p class="original-title"><span class="info-name">Titolo Originale:</span> {{ originalTitle }}</p>
                <p class="lang"><span class="info-name">Lingua Originale:</span> <img :src="getFlagUrl(lang)"></p>
                <p class="vote">
                    Voto:
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

export default {
    props: {
        title: String,
        originalTitle: String,
        lang: String,
        vote: Number,
        poster: String,
        overview: String,
    },
    data() {
        return {
            dimensione: 'w342',
            posterVisible: false,
        }
    },
    computed: {
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
            return this.overview.substring(0, 300) + '...';
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
    },
    mounted() {
        this.isVisible();
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