<template>
     <div>
        <div class="w-full relative group">
            <img src="../../public/header.jpg" alt="header profile" class="w-full h-52 cursor-pointer object-cover">
            <div class="absolute group-hover:flex transition ease-in-out bg-gray-800/85 hover:bg-gray-700/75 cursor-pointer w-10 h-10 rounded-full hidden justify-center items-center right-4 top-4">
                <IconsCameraIcon class="text-white" @click.prevent="handleImageChange"/>
            </div>
        </div>
        <div>
            <div class="flex justify-end relative mt-3 mx-3">
                <div class="group">
                    <img :src="user.profileImage" alt="profile" class="w-32 h-32 group cursor-pointer absolute left-2 -top-20 rounded-full border-4 border-white">
                    <div class="absolute transition ease-in-out hidden hover:bg-gray-700/75 group-hover:flex cursor-pointer bg-gray-800/85 w-10 h-10 rounded-full justify-center items-center left-[3.7em] -top-9">
                        <IconsCameraIcon class="text-white" @click.prevent="handleImageChange"/>
                    </div>
                </div>
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

const handleImageChange = () => {
    alert('change img')
}
</script>