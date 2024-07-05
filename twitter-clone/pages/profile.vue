<template>
    <div>
        <MainSection :title="userName" :loading="false">
            <Head>
                <Title>{{ title }}</Title>
            </Head>

            <div>
                <!-- User profile -->
                <Profile :user="user"/>
            </div>

            <div v-if="loading" class="flex items-center justify-center p-4 border ">
                <IconsSpinner/>
            </div>

            <TweetListFeed v-else-if="tabIndex != 5" :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/>
            
            <!-- tweets liked -->
            <TweetListFeed v-else-if="tabIndex == 5" :user="user" :tweets="tweetsLiked" @delete-succes="reloadHomeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';
import useEmitter from '~/composbles/useEmitter';

const emitter = useEmitter()

const { useAuthUser } = useAuth()
const { getUserTweets } = useTweets()
const { getTweetsLiked } = useTweets()

const homeTweets = ref([])
const tweetsLiked = ref([])
const user = useAuthUser()
const loading = ref(false)

const userName = computed(() => user.value.name)
const title = computed(() => `${user.value.name} (${user.value.handle}) / Twitter`)

const reloadUserTweets = async () => {
    loading.value = true;
    try {
        const { tweets } = await getUserTweets({
            query: user.value.id
        });
        homeTweets.value = tweets;
    } catch(error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const reloadUserTweetsLiked = async () => {
    loading.value = true;
    try {
        const { tweets } = await getTweetsLiked({
            query: user.value.id
        });
        tweetsLiked.value = tweets;
    } catch(error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    reloadUserTweets();
});

emitter.$on('deleteSuccess', (tweet) => {
    reloadUserTweets()
})

const tabIndex = ref(0)

emitter.$on('changeTab', (index) => {
    tabIndex.value = index
    if(index != 5) {
        reloadUserTweets()
    } else if (index == 5) {
        reloadUserTweetsLiked()
    }
})
</script>