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
                state.query = this.query.trim();                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-header {
        padding-block: 1rem;
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-block: 0.25rem;
            .main-header__title {
                color: #E50914;
                font-size: 2.5rem;
            }
            .search {
                display: flex;
                gap: 5px;
                margin-top: 1rem;
                .search__btn {
                    padding-inline: 1rem;
                }
            }
        }
    }
    @media (min-width: 600px) {
        .main-header {
            .container {
                flex-direction: row;
                .search {
                    margin-top: 0;
                    margin-left: auto;
                }
            }
        }
    }
</style>