<template>
    <div class="h-screen border-x">
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