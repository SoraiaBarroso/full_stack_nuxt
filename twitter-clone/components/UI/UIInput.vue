<template>
    <div class=" w-full">
         <label for="" v-if="$props.label" class="dark:text-white block pl-1 pb-3 ml-px text-sm font-medium text-gray-700">
            {{ $props.label }}
        </label>
         <input @input="event => emits('update:modelValue', event.target.value)"
         :type="$props.type" :placeholder="$props.placeholder" :value="$props.modelValue" :class="{ 'border-red-500': invalid, 'border-gray-300': !invalid }" 
         class="block px-4 w-full invalid:border-red-500 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
    </div>
 </template>
   
 <script setup>
 const emits = defineEmits(['update:modelValue'])

 const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    invalid: {
        type: Boolean,
        default: false // Corrected typo here
    }
 })
 </script>