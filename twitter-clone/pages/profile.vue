<template>
    <div>
        <MainSection :title="userName" :posts="nbrPosts" :loading="false">
            <Head>
                <Title>{{ title }}</Title>
            </Head>

            <div>
                <!-- User profile -->
                <Profile />
            </div>

            <div v-if="loading" class="flex items-center justify-center p-4 border border-white-200 dark:border-gray-700">
                <IconsSpinner />
            </div>

            <!-- Tweets by user -->
            <TweetListFeed v-else-if="tabIndex == 0" :user="user" :tweets="homeTweets"/>
            
            <TweetListFeed v-else-if="tabIndex == 1" :user="user" :tweets="userReplies"/>

            <!-- tweets liked -->
            <TweetListFeed v-else-if="tabIndex == 5" :user="user" :tweets="tweetsLiked"/>
        
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';
import useEmitter from '~/composbles/useEmitter';

const emitter = useEmitter()

const { useAuthUser } = useAuth()
const { getUserTweets, getTweetsLiked, getUserReplies } = useTweets()

const homeTweets = ref([])
const tweetsLiked = ref([])
const userReplies = ref([])
const user = useAuthUser()
const loading = ref(false)

// only called on delete
const reloadUserTweets = async () => {
    try {
        const { tweets } = await getUserTweets({ query: user.value.id });
        homeTweets.value = tweets;
    } catch (error) {
        console.log(error);
    } 
}; 

// only called on delete
const reloadUserTweetsLiked = async () => {
    try {
        const { tweets } = await getTweetsLiked({ query: user.value.id });
        tweetsLiked.value = tweets;
    } catch (error) {
        console.log(error);
    } 
};

const reloadUserReplies =  async () => {
    try {
        const {tweets} = await getUserReplies({query: user.value.id})
        userReplies.value = tweets
    } catch(error) {
        console.log(error);
    }
}

// inital load of tweets
const loadData = async () => {
    loading.value = true;
    try {
        const [userTweetsResponse, likedTweetsResponse, userRepliesTweets] = await Promise.all([
            getUserTweets({ query: user.value.id }),
            getTweetsLiked({ query: user.value.id }),
            getUserReplies({ query: user.value.id })
        ]);
        userReplies.value = userRepliesTweets.tweets
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

emitter.$on('likeClick', () => {
    if (tabIndex.value == 5) {
        reloadUserTweets()
    } else if (tabIndex.value == 0) {
        reloadUserTweetsLiked()
    } else if(tabIndex.value == 1) {
        reloadUserReplies()
    }
})

const tabIndex = ref(0)

emitter.$on('changeTab', async (index) => {
  tabIndex.value = index;
});

const userName = computed(() => user.value.name)
const nbrPosts = computed(() => homeTweets.value.length)
const title = computed(() => `${user.value.name} (${user.value.handle}) / Twitter`)
</script>