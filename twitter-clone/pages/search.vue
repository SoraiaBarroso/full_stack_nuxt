<template>
    <div>
        <MainSection title="Search" :loading="loading">
            <Head>
                <Title>Search</Title>
            </Head>

            <TweetListFeed :user="user" :tweets="searchTweets" @delete-succes="reloadHomeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import useTweets from '~/composbles/useTweets';
import useAuth from '~/composbles/useAuth';
import { useRoute } from 'vue-router';
import useEmitter from '~/composbles/useEmitter';

const emitter = useEmitter()

emitter.$on('deleteSuccess', (tweet) => {
    reloadHomeTweets()
})

const route = useRoute();

const { useAuthUser } = useAuth()
const user = useAuthUser()

const searchTweets = ref([])
const loading = ref(false)

const { getHomeTweets } = useTweets()

const searchQuery = ref(route.query.q || ''); // Initialize with current query parameter

watch(() => route.query.q, () => {
    searchQuery.value = route.query.q;
    reloadHomeTweets();
});

onBeforeMount(() => {
    reloadHomeTweets();
})

const reloadHomeTweets = async () => {
    loading.value = true;
    try {
        const { tweets } = await getHomeTweets({
            query: searchQuery.value
        });
        searchTweets.value = tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>