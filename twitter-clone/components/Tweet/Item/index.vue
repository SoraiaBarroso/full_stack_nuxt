<template>
    <!-- Click tweet to go to answers -->
    <NuxtLink :to="replyToTweetUrl" >        
        <div class="pb-4 border-b border-white-200 dark:border-gray-700 dark:hover:bg-dim-300 cursor-pointer hover:bg-gray-50">
            <TweetItemHeader :tweet="props.tweet"/>

            <div class="ml-16">
                <p class="px-2 flex-shrink font-medium text-gray-800 w-auto dark:text-white">
                    {{ props.tweet.text }}
                </p>

                <div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mb-1 mr-4 ml-1 border-2 rounded-2xl border-white-200 dark:border-gray-700">
                    <img class="w-full rounded-2xl" :src="image.url" alt="Tweet image">
                </div>

                <div class="mt-1 mr-5">
                    <TweetItemActions :tweet="tweet"/>
                </div>

            </div>
        </div>
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
})

const replyToTweetUrl = computed(() => `/status/${props.tweet?.id}`)

</script>