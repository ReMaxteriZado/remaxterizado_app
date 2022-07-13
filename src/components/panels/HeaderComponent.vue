<template>
    <header>
        <div class="name">
            <h1 data-aos="fade-right" data-aos-duration="1000">Alejandro Espino</h1>
            <h3 data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000">Full Stack Developer</h3>
        </div>
    </header>
</template>

<style lang="scss">
    header {
        height: 100vh;
        background-color: $dark;
        color: white;
        position: relative;

        .name {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            text-align: right;

            h1 {
                font-size: 5rem;
                letter-spacing: 10px;
            }

            h3 {
                font-size: 2rem;
                padding-right: 15px;
            }
        }
    }
</style>