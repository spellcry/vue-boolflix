<template>
    <div class="loader">
        <div class="loader-icon"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .loader {
        align-self: center;
        margin-inline: auto;
        .loader-icon {
            position: relative;
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 2px solid white;
            animation: rotate 2s linear infinite;
            &::before {
                content: '';
                position: absolute;
                top: -2px;
                left: 50%;
                width: calc(50% + 2px);
                aspect-ratio: 1;
                background-color: $dark-grey;
            }
            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                25% {
                    transform: rotate(90deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                75% {
                    transform: rotate(270deg);
                }
                100% {
                    transform: rotate(360deg);                
                }
            }
        }
    }
</style>