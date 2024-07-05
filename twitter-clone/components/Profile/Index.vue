<template>
    <div class="border-x">
        <ProfileHeader :user="user"/>
        <ProfileInfo :user="user"/>
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