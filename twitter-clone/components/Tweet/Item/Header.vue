<template>
    <div class="p-4 pb-0 pl-5 flex" :class="{ 'h-auto': props.tweet.replyTo && props.tweet.replyTo.author.handle, 'h-10': !props.tweet.replyTo || !props.tweet.replyTo.author.handle }">
        <div>
            <img class="w-10 h-10 rounded-full hover:brightness-90" :src="author.profileImage" alt="">
        </div>

        <div class="ml-3 h-auto">
            <span class=" text-gray-800 font-bold dark:text-white hover:underline decoration-1">{{author.name}}</span>
        
            <span class="ml-1  text-sm font-medium text-gray-600">
                <NuxtLink to="#">
                    {{ author.handle }}
                </NuxtLink>
                · {{ props.tweet.postedAtHuman }}
            </span>

            <p v-if="props.tweet.replyTo" class="text-sm mb-2">
                <span class="text-gray-500">
                    Replying to
                </span>

                <NuxtLink :to="replyToTweetUrl" class="text-blue-400">
                    {{ props.tweet.replyTo.author.handle }}
                </NuxtLink>
            </p>
           
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
})

const author = props.tweet.author
const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`)
</script>