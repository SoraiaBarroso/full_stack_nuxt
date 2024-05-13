<template>
    <div class="dark:group-hover:bg-opacity-20 flex items-center group text-gray-500 cursor-pointer">
        <div :class="defaultTransition" class="p-2 group-hover:bg-blue-100 group-hover:text-blue-400 rounded-full">
            <IconsChatIcon class="w-5 h-5"/>
        </div>

        <span class="text-md group-hover:text-blue-400">
            5
        </span>
    </div>
</template>
<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const {defaultTransition} = useTailwindConfig()
</script>