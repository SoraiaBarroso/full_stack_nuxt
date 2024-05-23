<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <IconsSpinner/>
        </div>
        <div v-else>
              <!-- pass user object -->
            <TweetFormInput :placeholder="props.placeholder" :user="props.user" @onSubmit="handleFormSubmit"/>
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
        default: "What's happening?"
    }
})

async function handleFormSubmit(data) {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles
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