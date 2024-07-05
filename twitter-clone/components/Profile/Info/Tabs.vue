<template>
    <div class="flex w-full mx-0 mt-6 border-b">
        <div 
        v-for="(data, index) in tabsData"
        :key="index"
        @click="setActiveTab(index)"
        :class="['w-1/6 text-center h-10 flex justify-center mx-3 px-4 items-center font-semibold transition ease-in-out cursor-pointer', 
               activeTab === index ? 'text-black border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-200']"
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