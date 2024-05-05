<template>
    <div>
        <!-- pass user object -->
        <TweetInput :user="props.user" @onSubmit="handleFormSubmit"/>
    </div>
</template>
<script setup>
import useTweets from '~/composbles/useTweets';

const  { postTweet } = useTweets()

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

async function handleFormSubmit(data) {
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles
        })
        console.log(response)
    } catch(error) {
        console.log(error)
    }
}

</script>