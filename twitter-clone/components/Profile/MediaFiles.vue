<template>
    <div class="flex w-full flex-wrap h-auto p-2">
        <img v-for="files in props.mediaFiles" :src="files.url" alt="" class="w-48 h-56 object-cover cursor-pointer">
    </div>
</template>
<script setup> 
const props = defineProps({
    mediaFiles: {
        type: Array,
        required: true
    }
})
</script>