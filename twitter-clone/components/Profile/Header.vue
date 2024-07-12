<template>
     <div>
        <div class="w-full relative group">
            <img src="../../public/header.jpg" loading="lazy" alt="header profile" class="w-full h-52 cursor-pointer object-cover">
            
            <input type="file" ref="imageInput" hidden accept="image/png, image/gif, image/jpeg" @change="handleImageChange">

            <div class="absolute group-hover:flex transition ease-in-out bg-gray-800/85 hover:bg-gray-700/75 cursor-pointer w-10 h-10 rounded-full hidden justify-center items-center right-4 top-4">
                <IconsCameraIcon class="text-white" @click.prevent="handleImageClicked"/>
            </div>
        </div>
        <div>
            <div class="flex justify-end relative mt-3 mx-3">
                <div class="group">
                    <img :src="user.profileImage" loading="lazy" alt="profile" class="w-32 h-32 group cursor-pointer object-cover absolute left-2 -top-20 rounded-full border-4 border-white">
                    <div class="absolute transition ease-in-out hidden hover:bg-gray-700/75 group-hover:flex cursor-pointer bg-gray-800/85 w-10 h-10 rounded-full justify-center items-center left-[3.7em] -top-9">
                        <IconsCameraIcon class="text-white" @click.prevent="handleImageClicked"/>
                    </div>
                </div>
                <UIButton size="lg" secondary>Edit profile</UIButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import { useMessage } from 'naive-ui'

const message = useMessage()
const { updateProfileImg } = useAuth()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const selectedFile = ref(null)
const imageInput = ref()
const inputImageUrl = ref(props.user.profileImage);

function handleImageChange(event) {
    const file = event.target.files[0]

    selectedFile.value = file

    const reader = new FileReader()

    reader.onload = async (event) => {
        inputImageUrl.value = event.target.result;

        // Call API to update image after selection
        try {
            message.loading('Updating...')
            await updateProfileImg(props.user.id, event.target.result);
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    reader.readAsDataURL(file)
}

const handleImageClicked = () => {
    imageInput.value.click();
};
</script>