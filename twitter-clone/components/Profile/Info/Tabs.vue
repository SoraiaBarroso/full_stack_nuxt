<template>
    <div class="flex w-full mx-0 mt-6 border-b border-white-200 dark:border-gray-700">
        <div 
        v-for="(data, index) in tabsData"
        :key="index"
        @click="setActiveTab(index)"
        :class="['w-1/6 text-center h-10 flex justify-center mx-3 px-4 items-center font-semibold transition ease-in-out cursor-pointer', 
               activeTab === index ? 'text-black dark:text-white border-b-2 dark:border-blue-400 border-blue-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/85']"
        >
            {{data}}
        </div>
    </div>
</template>
<script setup>
import useEmitter from '~/composbles/useEmitter';

const emitter = useEmitter()

const tabsData = ['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes']

const activeTab = ref(0)

function setActiveTab(index) {
  activeTab.value = index
  emitter.$emit('changeTab', activeTab.value)  
}


</script>