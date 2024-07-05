<template>
    <button :disabled="props.disabled" class="flex justify-center items-center disabled:cursor-not-allowed disabled:bg-blue-300 dark:disabled:bg-blue-500/60 rounded-full font-bold font-sm transition ease-in-out"
    :class="buttonClasses" @click="handleClick">
        <span :class="textFontSize">
            <slot />
        </span>
    </button>
</template>
<script setup>
const emits = defineEmits(['onClick'])

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
  },
  secondary: {
    type: Boolean,
    default: false
  }
});

const paddingClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-3 py-1'
        case 'lg':
            return 'px-4 py-2'
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

const defaultWidth = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'w-30'
        default:
            return 'w-min'
    }
})

const buttonClasses = computed(() => {
    const baseClasses = `${paddingClasses.value} ${props.liquid ? "w-full" : defaultWidth.value}`
    const secondaryClasses = props.secondary ? 'bg-white border dark:bg-transparent dark:text-white border-gray-500 text-black hover:bg-gray-200' : 'bg-blue-400 hover:bg-blue-500 text-white'
    return `${baseClasses} ${secondaryClasses}`
})

function handleClick(event) {
    emits('onClick', event)
}

</script>