<template>
    <div class="p-4 flex">
        <div>
            <img class="w-10 h-10 rounded-full hover:brightness-90" :src="author.profileImage" alt="">
        </div>

        <div class="ml-3">
            <span class=" text-gray-800 font-bold dark:text-white hover:underline decoration-1">{{author.name}}</span>
        
            <span class="ml-1 text-sm font-medium text-gray-600">
                <nuxt-link to="#">
                    {{ author.handle }}
                </nuxt-link>
                · {{ props.tweet.postedAtHuman }}
            </span>

            <p v-if="props.tweet.replyTo" class="text-sm">
                <span class="text-gray-500">
                    Replying to
                </span>

                <nuxt-link :to="replyToTweetUrl" class="text-blue-400">
                    {{ props.tweet.replyTo.author.handle }}
                </nuxt-link>
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
const replyToTweetUrl = computed(() => `/status${props.tweet?.replyTo?.id}`)
</script>