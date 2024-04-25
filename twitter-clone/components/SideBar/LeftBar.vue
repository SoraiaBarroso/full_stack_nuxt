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

    <SideBarTab active>
        <template v-slot:icon>
            <IconsHomeIcon/>
        </template>
        <template v-slot:name>
            Home
        </template>
    </SideBarTab>

    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const { defaultTransition } = useTailwindConfig
</script>