<template>
    <div class="m-2 border dark:border-gray-700 rounded-2xl bg-white dark:bg-dim-900" 
    :class="twitterBorderColor">
        <h1 class="p-3 text-lg font-extrabold text-gray-900 dark:text-white">
            {{ props.title }}
        </h1>

        <slot></slot>

        <div class="p-3 h-12 rounded-b-2xl text-sm text-blue-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-dim-300 font-semibold"
        :class="defaultTransition">
            Show more
        </div>
    </div>
</template>
<script setup>
import useTailwindConfig from '../../../composbles/useTailwindConfig.js';

const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>