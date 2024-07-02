<template>
    <div>
        <MainSection title="Home" :loading="loading">
            <Head>
                <Title>Home / Twitter</Title>
            </Head>

            <div>
                <!-- pass user object -->
                <TweetForm :user="user" @tweet-posted="reloadHomeTweets"/>
            </div>

            <TweetListFeed :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';
import useEmitter from '~/composbles/useEmitter';

const emitter = useEmitter()

emitter.$on('deleteSuccess', (tweet) => {
    reloadHomeTweets()
})

const homeTweets = ref([])
const loading = ref(false)

const { useAuthUser } = useAuth()
const { getHomeTweets } = useTweets()

const user = useAuthUser()

const reloadHomeTweets = async () => {
    loading.value = true;
    try {
        const { tweets } = await getHomeTweets();
        homeTweets.value = tweets;
    } catch(error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    reloadHomeTweets(); // Load home tweets initially
});
</script>