<template>
    <div class="h-screen flex flex-col">
        <div class="w-min p-2 my-2 rounded-full hover:bg-blue-50
        dark:hover:bg-white/20" :class="defaultTransition"
        >
            <nuxt-link to="/">
                <div class="w-8 h-8">
                    <IconsTwitter/>
                </div>
            </nuxt-link>   
        </div>

        <div class="mt-2 space-y-3">
            <SideBarTab active>
                <template v-slot:icon>
                    <IconsHomeIcon/>
                </template>
                <template v-slot:name>
                    Home
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsSearchIcon/>
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsNotificationIcon/>
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsMessageIcon/>
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsListIcon/>
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsUserIcon/>
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </SideBarTab>

            <SideBarTab>
                <template v-slot:icon>
                    <IconsMoreIcon/>
                </template>
                <template v-slot:name>
                    More
                </template>
            </SideBarTab>
        </div>
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const { defaultTransition } = useTailwindConfig
</script>