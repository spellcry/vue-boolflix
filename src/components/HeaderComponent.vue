<template>
    <header class="main-header">
        <div class="container">
            <h1 class="main-header__title">BoolFlix</h1>
            <div class="search">
                <input type="text" class="search__input" v-model="query" placeholder="Cerca film e serie TV">
                <button @click="setQuery" class="search__btn">Cerca</button>
            </div>
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
    .main-header {
        padding-block: 1rem;
        .container {
            display: flex;
            align-items: center;
            padding-block: 0.25rem;
            .main-header__title {
                color: #E50914;
                font-size: 2.5rem;
            }
            .search {
                display: flex;
                gap: 5px;
                margin-left: auto;
                .search__btn {
                    padding-inline: 1rem;
                }
            }
        }
    }
</style>