<template>
    <div>
        <MainSection :title="userName" :posts="homeTweets.length":loading="false">
            <Head>
                <Title>{{ title }}</Title>
            </Head>

            <div>
                <!-- User profile -->
                <Profile :user="user"/>
            </div>

            <div v-if="loading" class="flex items-center justify-center p-4 border border-white-200 dark:border-gray-700">
                <IconsSpinner/>
            </div>

            <!-- Tweets by user -->
            <TweetListFeed v-else-if="tabIndex == 0" :user="user" :tweets="homeTweets"/>
            
            <!-- tweets liked -->
            <TweetListFeed v-else-if="tabIndex == 5" :user="user" :tweets="tweetsLiked"/>
        
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';
import useEmitter from '~/composbles/useEmitter';
import { debounce } from 'lodash';

const emitter = useEmitter()

const { useAuthUser } = useAuth()
const { getUserTweets, getTweetsLiked } = useTweets()

const homeTweets = ref([])
const tweetsLiked = ref([])
const user = useAuthUser()
const loading = ref(false)

const tweetCache = reactive({
    userTweets: null,
    likedTweets: null,
});

const userName = computed(() => user.value.name)
const title = computed(() => `${user.value.name} (${user.value.handle}) / Twitter`)

const reloadUserTweets = debounce(async () => {
    if (tweetCache.userTweets) {
        homeTweets.value = tweetCache.userTweets;
        return;
    }

    loading.value = true;
    try {
        const { tweets } = await getUserTweets({ query: user.value.id });
        homeTweets.value = tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}, 300); 

const reloadUserTweetsLiked = debounce(async () => {
    if (tweetCache.likedTweets) {
        tweetsLiked.value = tweetCache.likedTweets;
        return;
    }

    loading.value = true;
    try {
        const { tweets } = await getTweetsLiked({ query: user.value.id });
        tweetsLiked.value = tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}, 300);

const loadData = async () => {
    loading.value = true;
    try {
        const [userTweetsResponse, likedTweetsResponse] = await Promise.all([
            getUserTweets({ query: user.value.id }),
            getTweetsLiked({ query: user.value.id }),
        ]);
        homeTweets.value = userTweetsResponse.tweets;
        tweetsLiked.value = likedTweetsResponse.tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

onBeforeMount(() => {
    loadData();
});

emitter.$on('deleteSuccess', (tweet) => {
    reloadUserTweets()
})

const tabIndex = ref(0)

emitter.$on('changeTab', async (index) => {
  tabIndex.value = index;
  if (index === 0) {
    await reloadUserTweets();
  } else if (index === 5) {
    await reloadUserTweetsLiked();
  } 
});
</script>