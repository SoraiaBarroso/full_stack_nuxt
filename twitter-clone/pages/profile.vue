<template>
    <div>
        <MainSection :title="userName" :loading="loading">
            <Head>
                <Title>{{ title }}</Title>
            </Head>

            <div>
                <!-- User profile -->
                <Profile :user="user"/>
            </div>

            <TweetListFeed :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';

const { useAuthUser } = useAuth()
const { getUserTweets } = useTweets()

const homeTweets = ref([])
const user = useAuthUser()
const loading = ref(false)

const userName = computed(() => user.value.name)
const title = computed(() => `${user.value.name} (${user.value.handle}) / Twitter`)

const reloadHomeTweets = async () => {
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

onMounted(() => {
    reloadHomeTweets(); // Load home tweets initially
});
</script>