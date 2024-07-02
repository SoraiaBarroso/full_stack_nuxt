<template>
    <div @click.stop.prevent="emits('onClick')" class="transition ease-in-out dark:group-hover:bg-opacity-20 flex items-center group text-gray-500 cursor-pointer">
        <div :class="`p-2 dark:group-hover:bg-${props.color}-400 transition ease-in-out  dark:group-hover:bg-opacity-30 group-hover:bg-${props.color}-100 text-gray-600 dark:text-gray-500 group-hover:text-${props.color}-400 rounded-full`">
            
            <slot name="icon" classes="h-5 w-5"/>
        </div>

        <span :class="`text-sm dark:text-gray-500 group-hover:text-${props.color}-400`" >
            <slot name="default"></slot>
        </span>
    </div>
</template>
<script setup>
const emits = defineEmits(['onClick'])

const props = defineProps({
    color: {
        type: String,
        required: true
    }
})
</script>