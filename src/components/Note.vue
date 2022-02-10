<template>
    <div class="note" @click="editNote">
        <img v-for="(image, index) in images" :key="index" :src="image">
        <h3 v-if="title">{{ title }}</h3>
        <p v-if="note">{{ note }}</p>
        <!-- <button class="favourite">
            <svg viewBox="0 0 24 24"><path d="M17.25,1.851A6.568,6.568,0,0,0,12,4.558,6.568,6.568,0,0,0,6.75,1.851,7.035,7.035,0,0,0,0,9.126c0,4.552,4.674,9.425,8.6,12.712a5.29,5.29,0,0,0,6.809,0c3.922-3.287,8.6-8.16,8.6-12.712A7.035,7.035,0,0,0,17.25,1.851ZM13.477,19.539a2.294,2.294,0,0,1-2.955,0C5.742,15.531,3,11.736,3,9.126A4.043,4.043,0,0,1,6.75,4.851,4.043,4.043,0,0,1,10.5,9.126a1.5,1.5,0,0,0,3,0,4.043,4.043,0,0,1,3.75-4.275A4.043,4.043,0,0,1,21,9.126C21,11.736,18.258,15.531,13.477,19.539Z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"/></svg>
        </button> -->
    </div>
</template>

<script>
export default {
    name: "Note",
    props: {
        id: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        note: {
            type: String,
            required: true
        },

        images: {
            type: Array,
            required: true
        }
    },
    emits: ["edit-note"],
    methods: {
        editNote() {
            this.$emit("edit-note", this.id);
        },
    }
}
</script>

<style lang="scss">
.note {
    border: 1px solid #fff;
    border-radius: 0.5rem;
    padding: 1.2rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    break-inside: avoid;
    margin-bottom: 2rem;
    cursor: pointer;

    img {
        height: 80px;
    }

    h3 {
        font-size: 1.8rem;
    }

    p {
        font-size: 1.4rem;
    }
}
</style>