<template>
    <div class="flex flex-col">
        <!-- Input search -->
        <!-- <input type="text" placeholder="Search" class="m-2 p-2 rounded-2xl bg-gray-100 dark:bg-dim-700"/> -->
        <!-- Preview Card: whats happènign -->
        <SideBarRightBarPreviewCard title="What's happening">
            <SideBarRightBarCardItem v-for="data in whatsHappeninData">
                <div >
                    <p class="text-sm text-gray-500 dark:text-gray-500">{{ data.trending }}</p>

                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ data.title }}</h2>

                    <p class="text-sm text-gray-500 dark:text-gray-500">{{ data.count }}</p>
                </div>
                <div class="pr-2">
                    <SettingsIcons class=" text-gray-500 rounded-xl"/>
                </div>
            </SideBarRightBarCardItem>
        </SideBarRightBarPreviewCard>
        <!-- Preview Card: who to follow -->
        <SideBarRightBarPreviewCard title="Who to follow">
           <SideBarRightBarCardItem v-for="data in whoToFollowData">
                <div class="flex flex-row justify-between w-full p-2 pl-0">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="data.image" alt="data.name">
                        
                        <div class="flex flex-col ml-2 justify-between">
                            <h1 class="dark:text-white font-bold text-sm text-gray-800">{{ data.name }}</h1>
                            <p class="text-gray-500  dark:text-gray-500 text-sm">{{ data.handle }}</p>
                        </div>
                    </div>
                    <div class="flex items-center h-full">
                        <button class="hover:opacity-85 rounded-full px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white">Follow</button>
                    </div>
                </div>
           </SideBarRightBarCardItem>
        </SideBarRightBarPreviewCard>
    </div>
</template>
<script setup>
import SettingsIcons from '~/components/Icons/SettingsIcons.vue';

const whoToFollowData = ref([
    {
        name: 'Elon Musk',
        handle: '@ElonMusk',
        image: `https://picsum.photos/seed/${Math.random()}/200/200`
    },
    {
        name: 'Mark Zuckerberg',
        handle: '@MarkZuckerberg',
        image: `https://picsum.photos/seed/${Math.random()}/200/200`
    },
    {
        name: 'Bill Gates',
        handle: '@BillGates',
        image: `https://picsum.photos/seed/${Math.random()}/200/200`
    },
])

const whatsHappeninData = ref([
    {
        trending: '1 · Trending',
        title: 'SpaceX',
        count: '40.8k posts'
    },
    {
        trending: '2 · Trending',
        title: '#CodingIsFun',
        count: '8,880 posts'
    },
    {
        trending: '3 · Trending',
        title: '#VueJs',
        count: '1,000 posts'
    },
])
</script>