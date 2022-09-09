<template>
    <main class="main-content">
        <div class="container">
            <ListComponent type="films"/>
            <ListComponent type="series"/>
        </div>
    </main>
</template>

<script>
    import ListComponent from "./ListComponent.vue";

    export default {
        components: {
            ListComponent,
        }
    }
</script>

<style lang="scss" scoped>
    
</style>