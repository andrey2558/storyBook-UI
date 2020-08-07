<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <btn @dblclick="test" />
    </div>
</template>

<script>
    import Btn from './components/btn/btn';

    export default {
        name: 'App',
        components: {
            Btn,
        },
        methods: {
            test() {
                console.log(123);
            },
        },
    };
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
