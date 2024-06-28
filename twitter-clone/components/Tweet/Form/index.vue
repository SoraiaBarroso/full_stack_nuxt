<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <IconsSpinner/>
        </div>
        <div v-else>
            <TweetItem compact :tweet="props.replyTo" :user="user" v-if="props.replyTo && props.showReply" hideActions/>
            <!-- pass user object -->
            <TweetFormInput :popup="props.popup" :placeholder="props.placeholder" :reply-to="props.replyTo" :user="props.user" @onSubmit="handleFormSubmit"/>
        </div>
    </div>
</template>
<script setup>
import useTweets from '~/composbles/useTweets';

const  { postTweet } = useTweets()
const loading = ref(false)

const emit = defineEmits(['tweetPosted']);

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    placeholder: {
        type: String,
        default: "What is happening?!"
    },
    replyTo: {
        type: Object,
        default: null
    },
    popup: {
        type: Boolean,
        default: false
    },
    showReply: {
        type: Boolean,
        default: false
    }
})

async function handleFormSubmit(data) {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo: props.replyTo?.id,
        })
        
        emit('tweetPosted', response.tweet)
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
        
    }
}

</script>