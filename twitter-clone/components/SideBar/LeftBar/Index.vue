<template>
    <div class="h-screen flex flex-col md:items-start xl:items-start xs:items-center">
        <div class="w-min p-2 my-1 rounded-full hover:bg-blue-50
        dark:hover:bg-white/20" :class="defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <IconsTwitter/>
                </div>
            </NuxtLink> 
        </div>

        <!-- Buttons -->
        <div class="mt-2 space-y-2 flex flex-col  xs:justify-center xs:align-middle  w-5/6">
            <SideBarLeftBarTab 
                :link-to="'/'"
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
                :link-to="'profile'"
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
            
            <div class="hidden md:block xl:block ml-2 w-full">
                <UIButton liquid size="lg" @on-click="emits('click')">Tweet</UIButton>
            </div>

            <div class="block md:hidden xl:hidden">
                <UIButton  @on-click="emits('click')">
                    <div class="w-6 h-6 font-bold">
                        <IconsPostIcon/>
                    </div>
                </UIButton>
            </div>
        </div>
        
        <!-- Log Out -->
        <div class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100
        dark:hover:bg-dim-800" :class="defaultTransition">
            <div class="flex">
                <NuxtImg :src="props.user.profileImage" alt="user" class="w-10 h-10 rounded-full"/>
                <div class="flex-col hidden ml-2 xl:block">
                    <h1 class="text-sm font-bold text-gray-800 dark:text-white">{{ props.user.name }}</h1>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ props.user.handle }}</p>
                </div>
            </div>
            <div class="hidden ml-auto xl:block">
                <NDropdown :show-arrow="true" trigger="hover" size="large" :options="options" @select="handleLogOut">
                    <NButton><IconsChevronicon class="dark:text-white text-gray-600 hover:text-gray-600"/></NButton>
                </NDropdown>
            </div>
        </div>

    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';
import { NButton, NDropdown, NIcon, useMessage, useDialog } from 'naive-ui'
import LogOutIcon from '~/components/Icons/LogOutIcon.vue';

const message = useMessage()
const dialog = useDialog()

const { defaultTransition } = useTailwindConfig

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const handleLogOut = () => {
    dialog.info({
        title: 'Log Out?',
        content: 'You can always log back in at any time.',
        positiveText: 'Log Out',
        negativeText: 'Cancel',
        onPositiveClick: async () => {
        try {
            emits('onLogout')
        } catch(error) {
            message.error('Error Login out')
        }
        },
        onNegativeClick: () => {
            message.success('Thanks for staying with us :)')
        }
    })
}

const options = [
    {
        label: "Log Out",
        key: "Logout",
        icon: renderIcon(LogOutIcon)
    },
]

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const activeTab = ref('home'); // Default active tab
const emits = defineEmits(['click', 'onLogout'])

const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>