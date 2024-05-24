<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <IconsSpinner/>
        </div>
        <div v-else>
              <!-- pass user object -->
            <TweetFormInput :placeholder="props.placeholder" :reply-to="props.replyTo" :user="props.user" @onSubmit="handleFormSubmit"/>
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
    }
})

async function handleFormSubmit(data) {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo: props.replyTo?.id
        })
        console.log(response)
        emit('tweetPosted')
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
        
    }
}

</script>