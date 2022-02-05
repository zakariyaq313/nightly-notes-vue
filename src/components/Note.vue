<template>
    <div class="note" @click="editNote">
        <h3>{{ title }}</h3>
        <p>{{ note }}</p>
        <img :src="image">
    </div>
</template>

<script>
export default {
    name: "Note",
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String
        },
        note: {
            type: String
        },
        image: {
            type: String
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
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 1.2rem;

    img {
        height: 80px;
    }
}

i {
    cursor: pointer;
}
</style>