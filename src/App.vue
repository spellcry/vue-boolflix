<template>
  <div id="app">
    <MainHeader/>
    <MainContent/>
  </div>
</template>

<script>
  import MainHeader from './components/HeaderComponent.vue'
  import MainContent from './components/MainContentComponent.vue'

  export default {

    name: 'App',
    components: {
      MainHeader,
      MainContent,
    },
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
