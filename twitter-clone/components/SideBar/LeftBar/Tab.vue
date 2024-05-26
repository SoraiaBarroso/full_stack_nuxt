<template>
    <div>
        <NuxtLink to="#" class="cursor-pointer flex items-center p-3 w-min hover:bg-gray-200 rounded-full
         dark:hover:bg-dim-200 dark:text-white text-black" :class="defaultTransition">
            <div class="w-6 h-6 text-dark" :class="defaultTransition">
                <slot name="icon"></slot>
            </div>

            <div class="ml-4 text-md hidden md:block xl:block" :class="textClasses">
                <slot name="name"></slot>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const { defaultTransition } = useTailwindConfig

// if we pass active we set text to bold
const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>