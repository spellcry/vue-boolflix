<template>
    <div>
        {{ `Titolo: ${title} Titolo Originale: ${originalTitle} Lingua Originale: ` }} <img :src="getFlagUrl(lang)"> {{ ` Voto: ${vote}` }}
    </div>
</template>

<script>

export default {
    props: {
        title: String,
        originalTitle: String,
        lang: String,
        vote: Number,
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