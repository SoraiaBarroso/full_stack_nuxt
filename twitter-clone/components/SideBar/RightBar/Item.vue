<template>
   <div class="p-3 hover:bg-gray-50 dark:text-white cursor-pointer dark:hover:bg-dim-300"
    :class="wrapperClasses">
        Item
   </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';
const {defaultTransition, twitterBorderColor} = useTailwindConfig()

const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>