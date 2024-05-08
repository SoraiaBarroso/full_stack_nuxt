<template>
    <div>
        <MainSection title="Home" :loading="loading">
            <Head>
                <Title>Home / Twitter</Title>
            </Head>

            <div class="border-b border-white-200 dark:border-gray-700">
                <!-- pass user object -->
                <TweetForm :user="user"/>
            </div>

            <TweetListFeed :tweets="homeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';

const homeTweets = ref([])
const loading = ref(false)

const { useAuthUser } = useAuth()
const { getHomeTweets } = useTweets()

const user = useAuthUser()

onBeforeMount(async () => {
    loading.value = true

    try {
        const { tweets } = await getHomeTweets()

        homeTweets.value = tweets
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false
    }
})

</script>