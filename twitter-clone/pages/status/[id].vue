<template>
    <div >
        <MainSection title="Tweet" :loading="loading">
           
            <Head>
                <Title>My Twitter Clone</Title>
            </Head>

            <TweetDetails @reply="getTweet" :user="user" :tweet="tweet"/>

        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';

const loading = ref(false)
const tweet = ref(null)

const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()

const user = useAuthUser()

function getTweetIdFromRoute() {
    return useRoute().params.id
}

async function getTweet() {
    loading.value = true
    try {
       const response = await getTweetById(getTweetIdFromRoute())
       tweet.value = response.tweet
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onBeforeMount(() => {
    getTweet()
})
</script>