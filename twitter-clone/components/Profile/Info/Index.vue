<template>
    <div class="mt-6">
        <div class="mx-4">
            <h1 class="font-bold text-lg">{{ user.name }}</h1>
            <p class="text-gray-500">{{ user.handle }}</p>
        </div>

        <div class="mt-4 flex gap-4 mx-4">
            <ProfileInfoItem>
                <template #icon1>
                    <IconsLocationIcon class="w-5 h-5 text-gray-600"/>
                </template>
                <template #text1>
                    The World
                </template>
            </ProfileInfoItem>

            <ProfileInfoItem>
                <template #icon1>
                    <IconsCakeIcon class="w-5 h-5 text-gray-600"/>
                </template>
                <template #text1>
                    Born 12 April 2003
                </template>
            </ProfileInfoItem>
           
            <ProfileInfoItem>
                <template #icon1>
                    <IconsCalendarIcon class="w-5 h-5 text-gray-600"/>
                </template>
                <template #text1>
                    Joined {{ formattedDate }}
                </template>
            </ProfileInfoItem>
        </div>

        <div class="flex gap-4 mt-3 mx-4">
            <p class="text-gray-600 hover:underline cursor-pointer"><strong class="text-gray-700">860</strong> Following</p>
            <p class="text-gray-600 hover:underline cursor-pointer"><strong class="text-gray-700">456</strong> Followers</p>
        </div>

        <ProfileInfoTabs />
    </div>
</template>
<script setup>
import { format } from 'date-fns'

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const formattedDate = computed(() => {
  const date = new Date(props.user.createdAt)
  return format(date, 'MMM yyyy')
})
</script>