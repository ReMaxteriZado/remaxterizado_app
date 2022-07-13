<template>
    <div class="technology-container">
        <div class="technology" :style="backgroundImage"></div>
    </div>
</template>

<script>

export default {
    props: {
        technology: Object
    },
    data() {
        return {
            backgroundImage: null
        }
    },
    mounted() {
        try {
            this.backgroundImage = {
                backgroundImage: `url(${require('@/assets/images/' + this.technology.image)})`
            }
        } catch (error) {
            console.error('Imagen not found: ' + JSON.stringify(this.technology));            
        }
    },
}
</script>

<style lang="scss" scoped>
    .technology {
        aspect-ratio: 1;
        background-position: center;
        background-size: cover;
        margin: 0;
        padding: 0;
        border-radius: 5px;
    }
</style>