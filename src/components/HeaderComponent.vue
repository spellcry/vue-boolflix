<template>
    <header class="main-header">
        <h1 class="main-header__title">BoolFlix</h1>
        <div class="search">
            <input type="text" class="search__input" v-model="query">
            <button @click="setQuery" class="search__btn">Cerca</button>
        </div>
    </header>
</template>

<script>
    import state from '../store'

    export default {
        data() {
            return {
                query: '',
            }
        },
        methods: {
            setQuery() {
                state.query = this.query;                
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>