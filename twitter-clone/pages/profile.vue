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
            <TweetListFeed v-else-if="tabIndex == 0" :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/>
            
            <!-- tweets liked -->
            <TweetListFeed v-else-if="tabIndex == 5" :user="user" :tweets="tweetsLiked" @delete-succes="reloadHomeTweets"/>
        
            <ProfileMediaFiles v-else-if="tabIndex == 4" :media-files="userFiles"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';
import useEmitter from '~/composbles/useEmitter';
import useMediaFiles from '~/composbles/useMediaFiles';

const emitter = useEmitter()

const { getUserMediaFiles } = useMediaFiles()
const { useAuthUser } = useAuth()
const { getUserTweets } = useTweets()
const { getTweetsLiked } = useTweets()

const homeTweets = ref([])
const tweetsLiked = ref([])
const userFiles = ref([])
const user = useAuthUser()
const loading = ref(false)

const userObject = reactive({
    id: '',
    name: '',
    handle: '',
    profileImage: '',
    // add more properties as needed
});

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

const getUserImages = async () => {
    loading.value = true;
    try {
        const { mediaFiles } = await getUserMediaFiles({
            query: user.value.id
        })
        userFiles.value = mediaFiles 
        console.log(mediaFiles.value)
    } catch(error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

onBeforeMount(() => {
    reloadUserTweets();
});

emitter.$on('deleteSuccess', (tweet) => {
    reloadUserTweets()
})

const tabIndex = ref(0)

emitter.$on('changeTab', (index) => {
    tabIndex.value = index
    if(index == 0) {
        reloadUserTweets()
    } else if (index == 5) {
        reloadUserTweetsLiked()
    } else if (index == 4) {
        getUserImages()
    }
})
</script>