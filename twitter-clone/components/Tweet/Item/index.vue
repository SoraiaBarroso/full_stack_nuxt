<template>
    <!-- Click tweet to go to answers -->
    <NuxtLink :to="replyToTweetUrl" @click="handleClick">        
        <div class="pb-4 border-b select-text border-white-200 dark:border-gray-700 dark:hover:bg-dim-300  hover:bg-gray-50">
            <TweetItemHeader :is-in-status-url="isInStatusUrl" :click-tweet="clickTweet" :user="user" :tweet="props.tweet"/>

            <div :class="tweetBodyWrapper">
                <p :class="textSize" class="px-2 mr-1 flex-shrink font-medium select-text text-gray-800 w-auto dark:text-white">
                    <span v-for="(word, index) in parsedTweet" :key="index" :class="{'text-blue-500 hover:text-blue-700': word.startsWith('#')}">
                        {{ word + " " }}
                    </span>
                </p>

                <div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mb-1 mr-4 ml-1 border-2 rounded-2xl border-white-200 dark:border-gray-700">
                    <img class="w-full rounded-2xl" :src="image.url" alt="Tweet image">
                </div>

                <div class="mt-1 mr-5" v-if="!props.hideActions">
                    <TweetItemActions :user="user" :tweet="tweet" @on-comment-click="handleCommentClick" @on-like-click="handleCommentClick"/>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
<script setup>
import useEmitter from '~/composbles/useEmitter';
import { useRoute } from 'vue-router';

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    },
    user: {
        type: Object,
        required: false
    },
    hideActions: {
        type: Boolean,
        default: false
    }
})

const textSize = computed(() => props.compact ? 'text-base' : 'text-lg')
const tweetBodyWrapper = computed(() => props.compact ? 'ml-14' : 'ml-3 mt-4')
const replyToTweetUrl = computed(() => `/status/${props.tweet?.id}`)

const emitter = useEmitter()

function handleCommentClick() {
    emitter.$emit('replyTweet', props.tweet)
}

const parsedTweet = computed(() => {
    return props.tweet.text.split(' ');
})

const route = useRoute();

const isInStatusUrl = ref(route.path.includes('/status/'));

watch(route, (newRoute) => {
    isInStatusUrl.value = newRoute.path.includes('/status/');
});
</script>