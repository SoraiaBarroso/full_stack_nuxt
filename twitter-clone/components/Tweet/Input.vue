<template>
    <div>
        <div class=" flex items-center flex-shrink-0 p-4">
            
            <div class="flex w-12 items-top">
                <img :src="props.user?.profileImage" alt="" class="inline-block w-10 h-10 rounded-full"
            </div>

            <div class="w-full">
                <textarea placeholder="What's happening?" v-model="text" class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-500 bg-transparent border-0 dark:text-white focus:ring-0 resize-none "></textarea>
            </div>
        </div>

        <!-- File selector -->
        <div class="p-4 pt-0 pl-16">
            <img class="rounded-2xl border border-white-200 dark:border-gray-700" :src="inputImageUrl" v-if="inputImageUrl" alt="Image uploaded by user">

            <div class="w-full border-t mt-4"></div>

            <input type="file" ref="imageInput" hidden
            accept="image/png, image/gif, image/jpeg" @change="handleImageChange">
        </div>

        <!-- Icons -->
        <div class="flex justify-between pl-14 pr-6 border-b border-white-200 dark:border-gray-700 pb-3">
            <div class="flex">
                <div @click="handleImageClick" class="flex justify-center items-center p-2 text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer">
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
            
            <UIButton size="sm" :disabled="isDisabled" @onClick="handleFormSubmit">Tweet</UIButton>
        </div>
    </div>
</template>
<script setup>

const text = ref('')
const emit = defineEmits(['onSubmit'])
const imageInput = ref()
const selectedFile = ref(null)
const inputImageUrl = ref(null)

const isDisabled = computed(() => text.value === '')

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

function handleFormSubmit() {
    emit('onSubmit', {
        text: text.value,
        mediaFiles: [selectedFile.value]
    })
}

function handleImageClick() {
    imageInput.value.click()
}

function handleImageChange(event) {
    const file = event.target.files[0]

    selectedFile.value = file

    const reader = new FileReader()

    reader.onload = (event) => {
        inputImageUrl.value = event.target.result
    }

    reader.readAsDataURL(file)
}
</script>