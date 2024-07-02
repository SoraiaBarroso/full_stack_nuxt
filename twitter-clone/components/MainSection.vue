<template>
    <div class="border-x border-white-200 dark:border-gray-700 h-auto">
        <div class="border-b border-white-200  sticky top-0 px-4 py-3 bg-white backdrop-blur-md border-white-200 dark:border-gray-700
        dark:bg-dim-900/80">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 ">{{ $props.title }}</h2>
        </div>
        <div v-if="props.loading" :class="twitterBorderColor" class="flex items-center justify-center p-4 border ">
            <IconsSpinner/>
        </div>
        <!--Main content-->
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const {twitterBorderColor} = useTailwindConfig()

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})
</script>