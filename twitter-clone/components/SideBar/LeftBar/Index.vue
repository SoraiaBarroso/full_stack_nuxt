<template>
    <div class="h-screen flex flex-col xl:items-start xs:items-center">
        <div class="w-min p-2 my-2 rounded-full hover:bg-blue-50
        dark:hover:bg-white/20" :class="defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <IconsTwitter/>
                </div>
            </NuxtLink> 
        </div>

        <div class="mt-2 space-y-3 flex flex-col xs:justify-center xs:align-middle">
            <SideBarLeftBarTab 
                :active="activeTab === 'home'"
                @click="setActiveTab('home')"
            >
                <template v-slot:icon>
                    <IconsHomeIcon/>
                </template>
                <template v-slot:name>
                    Home
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'explore'"
                @click="setActiveTab('explore')"
            >
                <template v-slot:icon>
                    <IconsSearchIcon/>
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'notifications'"
                @click="setActiveTab('notifications')"
            >
                <template v-slot:icon>
                    <IconsNotificationIcon/>
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'messages'"
                @click="setActiveTab('messages')"
            >
                <template v-slot:icon>
                    <IconsMessageIcon/>
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'lists'"
                @click="setActiveTab('lists')"
            >
                <template v-slot:icon>
                    <IconsListIcon/>
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'profile'"
                @click="setActiveTab('profile')"
            >
                <template v-slot:icon>
                    <IconsUserIcon/>
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab
                :active="activeTab === 'more'"
                @click="setActiveTab('more')"
            >
                <template v-slot:icon>
                    <IconsMoreIcon/>
                </template>
                <template v-slot:name>
                    More
                </template>
            </SideBarLeftBarTab>
            
            <NModal
                v-model:show="showModal"
                class="custom-card"
                preset="card"
                :bordered="false"
                size="huge"
                :style="bodyStyle"
                title="Tweet"
                :segmented="segmented"
            >            
                <TweetForm :user="user" :reply-to="tweet"  @tweet-posted="handleUpdate"  :popup="true"/>
            </NModal>

            <div class="hidden xl:block" @click="showModal = true">
                <UIButton liquid size="lg">Tweet</UIButton>
            </div>

            <div class="block xl:hidden">
                <UIButton>
                    <div class="w-6 h-6 font-bold">
                        <IconsPostIcon/>
                    </div>
                </UIButton>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';
import { NModal } from "naive-ui"
import useAuth from '~/composbles/useAuth';
import useTweets from '~/composbles/useTweets';

const { useAuthUser } = useAuth()
const { getTweetById } = useTweets()
const { defaultTransition } = useTailwindConfig

const tweet = ref(null)
const user = useAuthUser()

const activeTab = ref('home'); // Default active tab
const showModal = ref(false)

const setActiveTab = (tab) => {
    activeTab.value = tab;
};

const bodyStyle = {
  width: '600px',  
  height: '350px'
}

const segmented = {
  content: 'soft',
  footer: 'soft'
}

function handleUpdate(tweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>