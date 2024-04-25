<template>
    <div>
        <nux-link to="#" class="flex items-center p-3 w-min hover:bg-gray-200 rounded-full" :class="defaultTransition">
            <div class="w-6 h-6 text-dark" :class="defaultTransition">
                <slot name="icon"></slot>
            </div>

            <div class="ml-4 text-lg">
                <slot name="name"></slot>
            </div>
        </nux-link>
    </div>
</template>

<script setup>
import useTailwindConfig from '~/composbles/useTailwindConfig';

const { defaultTransition } = useTailwindConfig

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})


</script>