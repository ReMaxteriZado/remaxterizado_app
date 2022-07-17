<template>
    <div>
        <div class="container">
            <div class="group-animation">
                <div class="d-flex flex-column gap-3">
                    <div class="circle first"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle last"></div>
                </div>
                <img
                    class="se-mueve"
                    src="@/assets/images/logo.png"
                    alt=""
                    width="400"
                />
            </div>
        </div>
    </div>
</template>

<script>
// import gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
    data: () => ({
        counter: {
            value: 0,
        },
        animation: null,
    }),
    mounted() {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".first",
                start: "top center",
                end: "+=500",
                toggleActions: "play pause resume reverse",
                markers: true,
                scrub: true,
                pin: true,
            },
        });

        tl.to(".first", {
            x: 300,
            duration: 1.5,
            ease: "power2.inOut",
        });
    },
};
</script>

<style lang="scss" scoped>
.circle {
    width: 20rem;
    height: 20rem;
    background-color: #ff5522;
    border-radius: 50%;
}

.container {
    height: 400vh;
    .group-animation {
        position: relative;

        .se-mueve {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
</style>
