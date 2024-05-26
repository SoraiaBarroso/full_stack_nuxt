<template>
    <div>

        <div v-if="isEmptyArray && !props.detailsFeed">
            <p class="text-gray-700 dark:text-white w-full text-center pt-4">
                No posted tweets &#x1F614;
            </p>
        </div>
        

        <div v-else class="border-x border-white-200 dark:border-gray-700"
        v-for="tweet in $props.tweets" :key="tweet.id" :class="defaultTransition">
            <TweetItem compact :tweet="tweet" />        
        </div>
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';
const { defaultTransition } = useTailwindConfig

const props = defineProps({
    tweets: {
        type: Array,
        required: true
    },
    detailsFeed: {
        type: Boolean,
        default: false
    }
})

const isEmptyArray = computed(() => props.tweets.length === 0)
</script>