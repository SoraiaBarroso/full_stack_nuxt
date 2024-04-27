<template>
    <div class="h-screen flex flex-col">
        <div class="w-min p-2 my-2 rounded-full hover:bg-blue-50
        dark:hover:bg-white/20" :class="defaultTransition"
        >
            <nux-link to="/">
                <div class="w-8 h-8">
                    <IconsTwitter/>
                </div>
            </nux-link> 
        </div>

        <div class="mt-2 space-y-3">
            <SideBarLeftBarTab active>
                <template v-slot:icon>
                    <IconsHomeIcon/>
                </template>
                <template v-slot:name>
                    Home
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsSearchIcon/>
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsNotificationIcon/>
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsMessageIcon/>
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsListIcon/>
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsUserIcon/>
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </SideBarLeftBarTab>

            <SideBarLeftBarTab>
                <template v-slot:icon>
                    <IconsMoreIcon/>
                </template>
                <template v-slot:name>
                    More
                </template>
            </SideBarLeftBarTab>
        </div>
        
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const { defaultTransition } = useTailwindConfig
</script>