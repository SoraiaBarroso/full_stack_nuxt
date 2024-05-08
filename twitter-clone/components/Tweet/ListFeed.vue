<template>
    <div>
        <div class="border-x border-white-200 dark:border-gray-700"
        v-for="tweet in $props.tweets" :key="tweet.id" :class="defaultTransition">
            <TweetItem :tweet="tweet" />        
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
    }
})
</script>