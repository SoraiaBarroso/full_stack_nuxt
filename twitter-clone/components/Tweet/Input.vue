<template>
    <div>
        <div class=" flex items-center flex-shrink-0 p-3">
            
            <div class="flex w-12 items-top pb-5">
                <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full"
            </div>

            <div class="w-full pb-5 border-b border-white-200 dark:border-gray-700">
                <textarea placeholder="What's happening?" v-model="text" class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-500 bg-transparent border-0 dark:text-white focus:ring-0 resize-none "></textarea>
            </div>
        </div>

        <div class="flex justify-between pl-14 pr-6 border-b border-white-200 dark:border-gray-700 pb-3">
            <div class="flex">
                <div class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                    <IconsImageIcon/>
                </div>
                <div class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                    <IconsGifIcon/>
                </div>
                <div class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                    <IconsChartIcon/>
                </div>
                <div class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                    <IconsEmojiIcon/>
                </div>
                <div class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
                    <IconsCalendarIcon/>
                </div>
            </div>

            <button :disabled="!text" class="disabled:bg-blue-300  dark:disabled:bg-blue-500/30 rounded-full bg-blue-500 font-semibold px-3 py-2 text-white" @click="handleFormSubmit">Tweet</button>
        </div>
    </div>
</template>
<script setup>
const text = ref('')
const emit = defineEmits(['onSubmit'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

function handleFormSubmit() {
    alert(JSON.stringify({
        text: text.value
    }))
    emit('onSubmit', {
        text: text.value
    })
}
</script>