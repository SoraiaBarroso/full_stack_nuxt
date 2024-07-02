<template>
    <div class="border-x border-white-200 dark:border-gray-700 h-auto">
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
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

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