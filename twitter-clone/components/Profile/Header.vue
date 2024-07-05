<template>
     <div>
        <div class="w-full">
            <img src="../../public/header.jpg" alt="header profile" class="w-full h-52 cursor-pointer object-cover">
        </div>
        <div>
            <div class="flex justify-end relative mt-3 mx-3 z-0">
                <img :src="user.profileImage" alt="profile" class="w-32 h-32 cursor-pointer  absolute left-2 -top-20 rounded-full border-4 border-white">
                <UIButton size="lg" secondary>Edit profile</UIButton>
            </div>
        </div>
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