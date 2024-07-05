<template>
    <div>
        <MainSection :title="userName" :loading="loading">
            <Head>
                <Title>User / Twitter</Title>
            </Head>

            <div>
                <!-- pass user object -->
                 <Profile :user="user"/>
                <!-- <TweetForm :user="user" @tweet-posted="reloadHomeTweets"/> -->
            </div>

            <!-- <TweetListFeed :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/> -->
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';

const { useAuthUser } = useAuth()

const user = useAuthUser()

const userName = computed(() => user.value.name)
</script>