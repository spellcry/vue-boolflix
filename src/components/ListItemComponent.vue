<template>
    <div>
        <p>{{ `Titolo: ${title}` }}</p>
        <p>{{ `Titolo Originale: ${originalTitle}` }}</p>
        <p>{{ `Lingua Originale: ` }}<img :src="getFlagUrl(lang)"></p>
        <p>
            Voto:
            <template v-if="voteModified > 0">
                <font-awesome-icon v-for="n in voteModified" :key="n" icon="fa-solid fa-star" />
            </template>
            <font-awesome-icon v-for="n in 5 - voteModified" :key="n + voteModified" icon="fa-regular fa-star" />
        </p>
        <p v-if="hasPoster">{{ `Poster: ` }}</p>
        <p v-else>{{ `Poster: Non disponibile ` }}</p>
        <img v-if="hasPoster" :src="getPoster()">
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
        voteModified() {
            return Math.ceil(this.vote / 2);
        }
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
    
</style>