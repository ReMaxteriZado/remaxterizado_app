<template>
    <div>
        <FormComponent />
    </div>
</template>

<script>
import FormComponent from "./FormComponent.vue";

export default {
    components: {
        FormComponent,
    },
    // mounted() {
    //     let req = new Request("http://remaxterizado-v2.test/api/items", {
    //         method: "get",
    //     });
    //     fetch(req).then((response) => {
    //         for (let pair of response.headers.entries()) {
    //             console.log(pair[0] + ": " + pair[1]);
    //         }
    //     });
    // },
};
</script>
