<template>
        <ProfileHeader :user="user"/>
        <div>
            hello
        </div>
</template>
<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>