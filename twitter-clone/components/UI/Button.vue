<template>
    <button :disabled="disabled" class="disabled:cursor-not-allowed disabled:bg-blue-300 dark:disabled:bg-blue-500/30 rounded-full bg-blue-400 hover:bg-blue-500 font-bold font-sm text-white"
    :class="classes">
        <span :class="textFontSize">
            <slot />
        </span>
    </button>
</template>
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  liquid: {
    type: Boolean,
    default: false
  }
});

const paddingClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-3 py-1'
        case 'lg':
            return 'px-4 py-3'
        default:
            return 'px-3 py-3'
    }
})

const textFontSize = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'text-md'
        default:
            return 'text-sm'
    }
})

const classes = computed(() => `${paddingClasses.value}`)
</script>