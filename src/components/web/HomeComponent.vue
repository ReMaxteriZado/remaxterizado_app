<template>
    <div>
        <FormComponent />
        <div class="container">
            <img
                class="logo"
                src="@/assets/images/logo.png"
                alt=""
                width="400"
            />
            {{ counter.value }}

            <div class="d-flex gap-3">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <button
                class="btn btn-primary text-white"
                @click="animation.pause()"
            >
                Pausa
            </button>
            <button
                class="btn btn-primary text-white"
                @click="animation.play()"
            >
                Play
            </button>
        </div>
    </div>
</template>

<script>
import FormComponent from "./FormComponent.vue";

// import gsap
// import { gsap } from "gsap";

// mapActions

import { mapActions } from "vuex";

export default {
    components: {
        FormComponent,
    },
    data: () => ({
        counter: {
            value: 0,
        },
        animation: null,
    }),
    methods: {
        ...mapActions(["getCategories"]),
    },
    mounted() {
        this.getCategories();
        // gsap.set(".logo", {
        //     transformOrigin: "50% 50%",
        //     border: "1px solid blue",
        // });

        // const tl = gsap.timeline({
        //     repeat: 2,
        //     yoyo: true,
        // });

        // this.animation = tl.from(".circle", {
        //     // random y value
        //     y: () => Math.random() * 500 - 300,
        //     x: "random(-500, 500)",
        //     duration: 1,
        //     opacity: 0,
        //     ease: "power3.out",
        //     stagger: 0.5,
        // });

        // tl.from(".logo", {
        //     duration: 1,
        //     x: -500,
        //     backgroundColor: "#blue",
        // });

        // tl.to(this.counter, {
        //     duration: 1,
        //     value: 500,
        //     onUpdate: () => {
        //         console.log(this.counter);
        //     },
        // }, "-=1");

        // tl.to(".logo", {
        //     duration: 1,
        //     x: 500,
        //     backgroundColor: "#ff5522",
        //     ease: "power3.out",
        //     rotation: 360,
        // });
    },
};
</script>

<style lang="scss" scoped>
.circle {
    width: 100px;
    height: 100px;
    background-color: #ff5522;
    border-radius: 50%;
}
</style>
