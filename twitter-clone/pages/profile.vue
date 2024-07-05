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

            <!-- <TweetListFeed :user="user" :tweets="homeTweets" @delete-succes="reloadHomeTweets"/> -->
        </MainSection>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';

const { useAuthUser } = useAuth()

const user = useAuthUser()

const userName = computed(() => user.value.name)
const title = computed(() => `${user.value.name} (${user.value.handle}) / Twitter`)
</script>