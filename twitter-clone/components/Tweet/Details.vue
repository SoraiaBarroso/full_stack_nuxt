<template>
    <div>
        <TweetItem :tweet="props.tweet"/>

        <TweetForm placeholder="Tweet your reply" :reply-to="props.tweet" :user="props.user" @tweet-posted="handleUpdate"/>

        <TweetListFeed :details-feed="true" :tweets="replies"/>
    </div>
</template>

<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
})

const replies = computed(() => props.tweet?.replies ||  [])

function handleUpdate(tweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>